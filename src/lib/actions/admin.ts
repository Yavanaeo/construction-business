"use server";

import { db } from "@/lib/db";
import { revalidatePath } from "next/cache";
import { auth } from "@/lib/auth";

// ============ TYPES ============

interface SessionUser {
  id: string;
  email: string;
  name?: string | null;
  role: string;
  image?: string | null;
}

interface SessionWithUser {
  user: SessionUser;
}

interface AdminService {
  id: string;
  slug: string;
  number: string;
  title: string;
  description: string;
  short_description: string | null;
  icon: string | null;
  features: string[];
  display_order: number;
  is_active: boolean;
  meta_title: string | null;
  meta_description: string | null;
  created_at: string;
  updated_at: string;
}

interface AdminProject {
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
  meta_title: string | null;
  meta_description: string | null;
  created_at: string;
  updated_at: string;
}

interface ContactSubmission {
  id: string;
  name: string;
  email: string;
  phone: string | null;
  project_type: string | null;
  message: string;
  status: string;
  admin_notes: string | null;
  created_at: string;
  updated_at: string;
}

// ============ AUTH CHECK ============

async function requireAdmin(): Promise<SessionUser> {
  const session = (await auth()) as SessionWithUser | null;
  if (!session?.user || session.user.role !== "admin") {
    throw new Error("Unauthorized: Admin access required");
  }
  return session.user;
}

// ============ HELPERS ============

function mapFeatures<T extends { features: unknown }>(item: T): T {
  return {
    ...item,
    features: typeof item.features === "string" ? JSON.parse(item.features as string) : item.features,
  } as T;
}

function mapFeaturesArray<T extends { features: unknown }>(items: T[]): T[] {
  return items.map(mapFeatures);
}

// ============ SERVICE ADMIN ============

export async function adminGetServices(): Promise<AdminService[]> {
  await requireAdmin();
  const result = await db<AdminService[]>`
    SELECT * FROM services ORDER BY display_order ASC, number ASC
  `;
  return mapFeaturesArray(result);
}

export async function adminGetService(id: string): Promise<AdminService | null> {
  await requireAdmin();
  const result = await db<AdminService[]>`
    SELECT * FROM services WHERE id = ${id}
  `;
  if (!result[0]) return null;
  return mapFeatures(result[0]);
}

export async function adminCreateService(data: Omit<AdminService, "id" | "created_at" | "updated_at">): Promise<AdminService> {
  await requireAdmin();
  const result = await db<AdminService[]>`
    INSERT INTO services (slug, number, title, description, short_description, icon, features, display_order, is_active, meta_title, meta_description)
    VALUES (${data.slug}, ${data.number}, ${data.title}, ${data.description}, ${data.short_description}, ${data.icon}, ${JSON.stringify(data.features)}::jsonb, ${data.display_order}, ${data.is_active}, ${data.meta_title}, ${data.meta_description})
    RETURNING *
  `;
  revalidatePath("/services");
  revalidatePath("/admin/services");
  return mapFeatures(result[0]);
}

export async function adminUpdateService(id: string, data: Partial<AdminService>): Promise<AdminService> {
  await requireAdmin();
  const setClause = Object.entries(data)
    .filter(([k]) => k !== "id" && k !== "created_at" && k !== "updated_at")
    .map(([k, v]) => {
      if (k === "features") return `${k} = ${JSON.stringify(v)}::jsonb`;
      if (typeof v === "string") return `${k} = ${v}`;
      if (typeof v === "boolean") return `${k} = ${v}`;
      return `${k} = ${v}`;
    })
    .join(", ");

  const result = await db.unsafe<AdminService[]>(`UPDATE services SET ${setClause}, updated_at = NOW() WHERE id = ${id} RETURNING *`);
  revalidatePath("/services");
  revalidatePath("/admin/services");
  return mapFeatures(result[0]);
}

export async function adminDeleteService(id: string): Promise<void> {
  await requireAdmin();
  await db`DELETE FROM services WHERE id = ${id}`;
  revalidatePath("/services");
  revalidatePath("/admin/services");
}

export async function adminReorderServices(ids: string[]): Promise<void> {
  await requireAdmin();
  await db.begin(async (tx) => {
    for (let i = 0; i < ids.length; i++) {
      await tx`UPDATE services SET display_order = ${i}, updated_at = NOW() WHERE id = ${ids[i]}`;
    }
  });
  revalidatePath("/services");
  revalidatePath("/admin/services");
}

// ============ PROJECT ADMIN ============

interface AdminProject {
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
  meta_title: string | null;
  meta_description: string | null;
  created_at: string;
  updated_at: string;
}

export async function adminGetProjects(): Promise<AdminProject[]> {
  await requireAdmin();
  const result = await db<AdminProject[]>`
    SELECT * FROM projects ORDER BY display_order ASC, number ASC
  `;
  return mapFeaturesArray(result);
}

export async function adminGetProject(id: string): Promise<AdminProject | null> {
  await requireAdmin();
  const result = await db<AdminProject[]>`
    SELECT * FROM projects WHERE id = ${id}
  `;
  if (!result[0]) return null;
  return mapFeatures(result[0]);
}

export async function adminCreateProject(data: Omit<AdminProject, "id" | "created_at" | "updated_at">): Promise<AdminProject> {
  await requireAdmin();
  const result = await db<AdminProject[]>`
    INSERT INTO projects (slug, number, type, title, location, year, area, category, image_url, alt_text, description, short_description, features, challenges, timeline, display_order, is_featured, is_active, meta_title, meta_description)
    VALUES (${data.slug}, ${data.number}, ${data.type}, ${data.title}, ${data.location}, ${data.year}, ${data.area}, ${data.category}, ${data.image_url}, ${data.alt_text}, ${data.description}, ${data.short_description}, ${JSON.stringify(data.features)}::jsonb, ${data.challenges}, ${data.timeline}, ${data.display_order}, ${data.is_featured}, ${data.is_active}, ${data.meta_title}, ${data.meta_description})
    RETURNING *
  `;
  revalidatePath("/projects");
  revalidatePath("/admin/projects");
  return mapFeatures(result[0]);
}

export async function adminUpdateProject(id: string, data: Partial<AdminProject>): Promise<AdminProject> {
  await requireAdmin();
  const setClause = Object.entries(data)
    .filter(([k]) => k !== "id" && k !== "created_at" && k !== "updated_at")
    .map(([k, v]) => {
      if (k === "features") return `${k} = ${JSON.stringify(v)}::jsonb`;
      if (typeof v === "string") return `${k} = ${v}`;
      if (typeof v === "boolean") return `${k} = ${v}`;
      return `${k} = ${v}`;
    })
    .join(", ");

  const result = await db.unsafe<AdminProject[]>(`UPDATE projects SET ${setClause}, updated_at = NOW() WHERE id = ${id} RETURNING *`);
  revalidatePath("/projects");
  revalidatePath("/admin/projects");
  return mapFeatures(result[0]);
}

export async function adminDeleteProject(id: string): Promise<void> {
  await requireAdmin();
  await db`DELETE FROM projects WHERE id = ${id}`;
  revalidatePath("/projects");
  revalidatePath("/admin/projects");
}

export async function adminReorderProjects(ids: string[]): Promise<void> {
  await requireAdmin();
  await db.begin(async (tx) => {
    for (let i = 0; i < ids.length; i++) {
      await tx`UPDATE projects SET display_order = ${i}, updated_at = NOW() WHERE id = ${ids[i]}`;
    }
  });
  revalidatePath("/projects");
  revalidatePath("/admin/projects");
}

// ============ CONTACT SUBMISSIONS ADMIN ============

export async function adminGetContactSubmissions(): Promise<ContactSubmission[]> {
  await requireAdmin();
  return db<ContactSubmission[]>`
    SELECT * FROM contact_submissions ORDER BY created_at DESC
  `;
}

export async function adminUpdateContactStatus(id: string, status: string, adminNotes?: string): Promise<void> {
  await requireAdmin();
  await db`UPDATE contact_submissions SET status = ${status}, admin_notes = ${adminNotes || null}, updated_at = NOW() WHERE id = ${id}`;
  revalidatePath("/admin/contact");
}

interface ContactSubmission {
  id: string;
  name: string;
  email: string;
  phone: string | null;
  project_type: string | null;
  message: string;
  status: string;
  admin_notes: string | null;
  created_at: string;
  updated_at: string;
}

// ============ CUSTOMER/PROJECT ACCESS ============

export async function adminAssignCustomerToProject(customerId: string, projectId: string, role = "owner"): Promise<void> {
  await requireAdmin();
  await db`
    INSERT INTO customer_projects (customer_id, project_id, role)
    VALUES (${customerId}, ${projectId}, ${role})
    ON CONFLICT (customer_id, project_id) DO UPDATE SET role = ${role}
  `;
  revalidatePath("/admin/customers");
  revalidatePath("/admin/projects");
}

export async function adminRemoveCustomerFromProject(customerId: string, projectId: string): Promise<void> {
  await requireAdmin();
  await db`DELETE FROM customer_projects WHERE customer_id = ${customerId} AND project_id = ${projectId}`;
  revalidatePath("/admin/customers");
  revalidatePath("/admin/projects");
}

// ============ CUSTOMER MANAGEMENT ============

export interface AdminCustomer {
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
  user: {
    id: string;
    email: string;
    name: string | null;
    role: string;
  };
}

export async function adminGetCustomers(): Promise<AdminCustomer[]> {
  await requireAdmin();

  const result = await db<any[]>`
    SELECT c.*, u.id as user_id, u.email, u.name, u.role
    FROM customers c
    INNER JOIN users u ON c.user_id = u.id
    ORDER BY c.created_at DESC
  `;

  return result.map((c) => ({
    ...c,
    user: {
      id: c.user_id,
      email: c.email,
      name: c.name,
      role: c.role,
    },
  }));
}

// ============ ANALYTICS ============

export interface DashboardStats {
  totalServices: number;
  activeServices: number;
  totalProjects: number;
  featuredProjects: number;
  totalContacts: number;
  newContacts: number;
  totalCustomers: number;
  activeCustomers: number;
  totalUsers: number;
  adminUsers: number;
  staffUsers: number;
  customerUsers: number;
}

export async function getDashboardStats(): Promise<DashboardStats> {
  await requireAdmin();

  const [
    services,
    projects,
    contacts,
    customers,
    users,
  ] = await Promise.all([
    db`SELECT COUNT(*) as count FROM services WHERE is_active = TRUE`,
    db`SELECT COUNT(*) as count FROM projects WHERE is_active = TRUE`,
    db`SELECT COUNT(*) as count FROM contact_submissions`,
    db`SELECT COUNT(*) as count FROM customers`,
    db`SELECT role, COUNT(*) as count FROM users GROUP BY role`,
  ]);

  const userRoles = users.reduce((acc, u) => {
    acc[u.role] = Number(u.count);
    return acc;
  }, {} as Record<string, number>);

  const newContactsResult = await db`SELECT COUNT(*) as count FROM contact_submissions WHERE status = 'new'`;
  const activeCustomersResult = await db`SELECT COUNT(*) as count FROM customers c INNER JOIN users u ON c.user_id = u.id WHERE u.role = 'customer'`;

  return {
    totalServices: Number(services[0]?.count || 0),
    activeServices: Number(services[0]?.count || 0),
    totalProjects: Number(projects[0]?.count || 0),
    featuredProjects: Number(projects[0]?.count || 0),
    totalContacts: Number(contacts[0]?.count || 0),
    newContacts: Number(newContactsResult[0]?.count || 0),
    totalCustomers: Number(customers[0]?.count || 0),
    activeCustomers: Number(activeCustomersResult[0]?.count || 0),
    totalUsers: Object.values(userRoles).reduce((a, b) => a + b, 0),
    adminUsers: userRoles.admin || 0,
    staffUsers: userRoles.staff || 0,
    customerUsers: userRoles.customer || 0,
  };
}

export interface RecentActivity {
  id: string;
  action: string;
  entity_type: string;
  entity_id: string;
  user_name: string | null;
  user_email: string;
  created_at: string;
}

export async function getRecentActivity(limit = 10): Promise<RecentActivity[]> {
  await requireAdmin();

  const result = await db`
    SELECT al.*, u.name as user_name, u.email as user_email
    FROM audit_logs al
    LEFT JOIN users u ON al.user_id = u.id
    ORDER BY al.created_at DESC
    LIMIT ${limit}
  `;

  return result.map((r) => ({
    id: r.id,
    action: r.action,
    entity_type: r.entity_type,
    entity_id: r.entity_id,
    user_name: r.user_name,
    user_email: r.user_email,
    created_at: r.created_at,
  }));
}

export interface ContentHealth {
  servicesWithoutImage: number;
  projectsWithoutDescription: number;
  contactsUnread: number;
  customersIncomplete: number;
}

export async function getContentHealth(): Promise<ContentHealth> {
  await requireAdmin();

  const [
    servicesWithoutImage,
    projectsWithoutDescription,
    contactsUnread,
    customersIncomplete,
  ] = await Promise.all([
    db`SELECT COUNT(*) as count FROM services WHERE is_active = TRUE`, // placeholder - would need image field
    db`SELECT COUNT(*) as count FROM projects WHERE is_active = TRUE AND (description IS NULL OR description = '')`,
    db`SELECT COUNT(*) as count FROM contact_submissions WHERE status = 'new'`,
    db`SELECT COUNT(*) as count FROM customers WHERE phone IS NULL OR address IS NULL`,
  ]);

  return {
    servicesWithoutImage: Number(servicesWithoutImage[0]?.count || 0),
    projectsWithoutDescription: Number(projectsWithoutDescription[0]?.count || 0),
    contactsUnread: Number(contactsUnread[0]?.count || 0),
    customersIncomplete: Number(customersIncomplete[0]?.count || 0),
  };
}

// ============ USER MANAGEMENT ============

export interface AdminUser {
  id: string;
  email: string;
  name: string | null;
  role: string;
  image: string | null;
  email_verified: string | null;
  created_at: string;
  updated_at: string;
}

export async function adminGetUsers(): Promise<AdminUser[]> {
  await requireAdmin();
  const result = await db<AdminUser[]>`
    SELECT id, email, name, role, image, email_verified, created_at, updated_at
    FROM users
    ORDER BY created_at DESC
  `;
  return result;
}

export async function adminUpdateUserRole(userId: string, role: string): Promise<void> {
  await requireAdmin();
  const validRoles = ["admin", "staff", "customer"];
  if (!validRoles.includes(role)) {
    throw new Error("Invalid role");
  }
  await db`UPDATE users SET role = ${role}, updated_at = NOW() WHERE id = ${userId}`;
  revalidatePath("/admin/users");
}

export async function adminDeleteUser(userId: string): Promise<void> {
  await requireAdmin();
  await db`DELETE FROM users WHERE id = ${userId}`;
  revalidatePath("/admin/users");
}