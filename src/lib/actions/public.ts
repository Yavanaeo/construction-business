"use server";

import { db } from "@/lib/db";
import { revalidatePath } from "next/cache";

// ============ SERVICES ============

export interface Service {
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

export async function getServices(): Promise<Service[]> {
  const result = await db<Service[]>`
    SELECT * FROM services
    WHERE is_active = TRUE
    ORDER BY display_order ASC, number ASC
  `;
  return result.map((s) => ({
    ...s,
    features: typeof s.features === "string" ? JSON.parse(s.features) : s.features,
  }));
}

export async function getServiceBySlug(slug: string): Promise<Service | null> {
  const result = await db<Service[]>`
    SELECT * FROM services WHERE slug = ${slug} AND is_active = TRUE
  `;
  if (!result[0]) return null;
  return {
    ...result[0],
    features: typeof result[0].features === "string" ? JSON.parse(result[0].features) : result[0].features,
  };
}

// ============ PROJECTS ============

export interface Project {
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

export async function getProjects(): Promise<Project[]> {
  const result = await db<Project[]>`
    SELECT * FROM projects
    WHERE is_active = TRUE
    ORDER BY display_order ASC, number ASC
  `;
  return result.map((p) => ({
    ...p,
    features: typeof p.features === "string" ? JSON.parse(p.features) : p.features,
  }));
}

export async function getFeaturedProjects(limit = 3): Promise<Project[]> {
  const result = await db<Project[]>`
    SELECT * FROM projects
    WHERE is_active = TRUE AND is_featured = TRUE
    ORDER BY display_order ASC
    LIMIT ${limit}
  `;
  return result.map((p) => ({
    ...p,
    features: typeof p.features === "string" ? JSON.parse(p.features) : p.features,
  }));
}

export async function getProjectBySlug(slug: string): Promise<Project | null> {
  const result = await db<Project[]>`
    SELECT * FROM projects WHERE slug = ${slug} AND is_active = TRUE
  `;
  if (!result[0]) return null;
  return {
    ...result[0],
    features: typeof result[0].features === "string" ? JSON.parse(result[0].features) : result[0].features,
  };
}

// ============ CONTACT SUBMISSIONS ============

export interface ContactSubmission {
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

export async function createContactSubmission(data: {
  name: string;
  email: string;
  phone?: string;
  project_type?: string;
  message: string;
}): Promise<ContactSubmission> {
  const result = await db<ContactSubmission[]>`
    INSERT INTO contact_submissions (name, email, phone, project_type, message)
    VALUES (${data.name}, ${data.email}, ${data.phone || null}, ${data.project_type || null}, ${data.message})
    RETURNING *
  `;
  revalidatePath("/contact");
  return result[0];
}

// ============ SITE SETTINGS ============

export async function getSiteSetting<T>(key: string): Promise<T | null> {
  const result = await db<{ value: T }[]>`
    SELECT value FROM site_settings WHERE key = ${key}
  `;
  return result[0]?.value ?? null;
}

export async function setSiteSetting(key: string, value: unknown): Promise<void> {
  await db`
    INSERT INTO site_settings (key, value)
    VALUES (${key}, ${JSON.stringify(value)}::jsonb)
    ON CONFLICT (key) DO UPDATE SET value = ${JSON.stringify(value)}::jsonb, updated_at = NOW()
  `;
  revalidatePath("/");
}