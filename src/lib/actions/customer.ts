"use server";

import { db } from "@/lib/db";
import { auth } from "@/lib/auth";
import { revalidatePath } from "next/cache";

// ============ TYPES ============

interface CustomerProject {
  id: string;
  slug: string;
  number: string;
  type: string;
  title: string;
  location: string;
  year: string;
  area: string;
  category: string;
  image_url: string;
  alt_text: string | null;
  description: string;
  short_description: string | null;
  features: string[];
  challenges: string | null;
  timeline: string | null;
  display_order: number;
  is_featured: boolean;
  is_active: boolean;
  role: string;
  created_at: string;
  updated_at: string;
}

interface ProjectUpdate {
  id: string;
  project_id: string;
  title: string;
  content: string;
  update_type: string;
  progress_percentage: number | null;
  images: string[];
  documents: string[];
  is_visible_to_customer: boolean;
  created_by: string | null;
  created_at: string;
  updated_at: string;
}

interface CustomerProfile {
  id: string;
  user_id: string;
  phone: string | null;
  address: string | null;
  city: string | null;
  province: string | null;
  postal_code: string | null;
  company_name: string | null;
  notes: string | null;
  created_at: string;
  updated_at: string;
}

// ============ AUTH HELPER ============

async function requireCustomer() {
  const session = await auth();
  if (!session?.user || session.user.role !== "customer") {
    throw new Error("Unauthorized: Customer access required");
  }
  return session.user;
}

// ============ CUSTOMER PROJECTS ============

export async function getCustomerProjects(): Promise<CustomerProject[]> {
  const user = await requireCustomer();

  // Get customer profile
  const customer = await db<{ id: string }[]>`
    SELECT id FROM customers WHERE user_id = ${user.id}
  `;

  if (!customer[0]) {
    return [];
  }

  const customerId = customer[0].id;

  // Get projects assigned to this customer
  const result = await db<CustomerProject[]>`
    SELECT p.*, cp.role
    FROM projects p
    INNER JOIN customer_projects cp ON cp.project_id = p.id
    WHERE cp.customer_id = ${customerId}
    AND p.is_active = TRUE
    ORDER BY cp.assigned_at DESC
  `;

  return result.map((p) => ({
    ...p,
    features: typeof p.features === "string" ? JSON.parse(p.features) : p.features,
  }));
}

export async function getCustomerProjectBySlug(slug: string): Promise<CustomerProject | null> {
  const user = await requireCustomer();

  const customer = await db<{ id: string }[]>`
    SELECT id FROM customers WHERE user_id = ${user.id}
  `;

  if (!customer[0]) {
    return null;
  }

  const customerId = customer[0].id;

  const result = await db<CustomerProject[]>`
    SELECT p.*, cp.role
    FROM projects p
    INNER JOIN customer_projects cp ON cp.project_id = p.id
    WHERE cp.customer_id = ${customerId}
    AND p.slug = ${slug}
    AND p.is_active = TRUE
  `;

  if (!result[0]) return null;

  return {
    ...result[0],
    features: typeof result[0].features === "string" ? JSON.parse(result[0].features) : result[0].features,
  };
}

// ============ PROJECT UPDATES ============

export async function getProjectUpdates(projectId: string): Promise<ProjectUpdate[]> {
  const user = await requireCustomer();

  const customer = await db<{ id: string }[]>`
    SELECT id FROM customers WHERE user_id = ${user.id}
  `;

  if (!customer[0]) {
    throw new Error("Customer profile not found");
  }

  // Verify customer has access to this project
  const access = await db`
    SELECT 1 FROM customer_projects WHERE customer_id = ${customer[0].id} AND project_id = ${projectId}
  `;

  if (!access[0]) {
    throw new Error("Access denied to this project");
  }

  const result = await db<ProjectUpdate[]>`
    SELECT * FROM project_updates
    WHERE project_id = ${projectId}
    AND is_visible_to_customer = TRUE
    ORDER BY created_at DESC
  `;

  return result.map((u) => ({
    ...u,
    images: typeof u.images === "string" ? JSON.parse(u.images) : u.images,
    documents: typeof u.documents === "string" ? JSON.parse(u.documents) : u.documents,
  }));
}

// ============ CUSTOMER PROFILE ============

export async function getCustomerProfile(): Promise<CustomerProfile | null> {
  const user = await requireCustomer();

  const result = await db<CustomerProfile[]>`
    SELECT * FROM customers WHERE user_id = ${user.id}
  `;

  return result[0] || null;
}

export async function updateCustomerProfile(data: Partial<CustomerProfile>): Promise<CustomerProfile> {
  const user = await requireCustomer();

  const setClause = Object.entries(data)
    .filter(([k]) => k !== "id" && k !== "user_id" && k !== "created_at" && k !== "updated_at")
    .map(([k, v]) => `${k} = ${v}`)
    .join(", ");

  const result = await db.unsafe<CustomerProfile[]>(`
    UPDATE customers SET ${setClause}, updated_at = NOW() WHERE user_id = ${user.id} RETURNING *
  `);

  revalidatePath("/portal");
  return result[0];
}

// ============ CUSTOMER DASHBOARD STATS ============

export async function getCustomerDashboardStats() {
  const user = await requireCustomer();

  const customer = await db<{ id: string }[]>`
    SELECT id FROM customers WHERE user_id = ${user.id}
  `;

  if (!customer[0]) {
    return { totalProjects: 0, activeProjects: 0, totalUpdates: 0, profileComplete: false };
  }

  const customerId = customer[0].id;

  const [projects, updates, profile] = await Promise.all([
    db`SELECT COUNT(*) as count FROM customer_projects WHERE customer_id = ${customerId}`,
    db`SELECT COUNT(*) as count FROM project_updates pu
        INNER JOIN customer_projects cp ON cp.project_id = pu.project_id
        WHERE cp.customer_id = ${customerId} AND pu.is_visible_to_customer = TRUE`,
    db`SELECT * FROM customers WHERE user_id = ${user.id}`,
  ]);

  const profileComplete = profile[0] && profile[0].phone && profile[0].address;

  return {
    totalProjects: Number(projects[0]?.count || 0),
    activeProjects: Number(projects[0]?.count || 0), // Could add project status field later
    totalUpdates: Number(updates[0]?.count || 0),
    profileComplete: !!profileComplete,
  };
}