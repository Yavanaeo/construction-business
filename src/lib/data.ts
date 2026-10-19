"use server";

import { cache } from "react";

type Awaited<T> = T extends Promise<infer U> ? U : T;

async function safe<T>(fn: () => Promise<T>, fallback: T): Promise<T> {
  try {
    return await fn();
  } catch {
    return fallback;
  }
}

export const getServices = cache(async () => {
  const { getServices } = await import("@/lib/actions/public");
  return safe(() => getServices(), []);
});

export const getServiceBySlug = cache(async (slug: string) => {
  const { getServiceBySlug } = await import("@/lib/actions/public");
  return safe(() => getServiceBySlug(slug), null);
});

export const getProjects = cache(async () => {
  const { getProjects } = await import("@/lib/actions/public");
  return safe(() => getProjects(), []);
});

export const getFeaturedProjects = cache(async (limit = 3) => {
  const { getFeaturedProjects } = await import("@/lib/actions/public");
  return safe(() => getFeaturedProjects(limit), []);
});

export const getProjectBySlug = cache(async (slug: string) => {
  const { getProjectBySlug } = await import("@/lib/actions/public");
  return safe(() => getProjectBySlug(slug), null);
});

export const createContactSubmission = cache(async (data: {
  name: string;
  email: string;
  phone?: string;
  project_type?: string;
  message: string;
}) => {
  const { createContactSubmission } = await import("@/lib/actions/public");
  return safe(() => createContactSubmission(data), null);
});

export const getSiteSetting = cache(async <T>(key: string) => {
  const { getSiteSetting } = await import("@/lib/actions/public");
  return safe(() => getSiteSetting<T>(key), null);
});

export type Service = Awaited<ReturnType<typeof getServices>>[number];
export type Project = Awaited<ReturnType<typeof getProjects>>[number];
