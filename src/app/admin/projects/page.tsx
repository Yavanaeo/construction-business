"use client";

import { useState, useEffect, useCallback } from "react";
import { Section } from "@/components/ui/Section";
import { Heading, Body, Caption, Label } from "@/components/ui/Typography";
import { Button } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";
import { getSession } from "@/lib/actions/session";
import {
  adminGetProjects,
  adminCreateProject,
  adminUpdateProject,
  adminDeleteProject,
} from "@/lib/actions/admin";

interface Project {
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
  is_featured: boolean;
  is_active: boolean;
}

export default function AdminProjectsPage() {
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [open, setOpen] = useState(false);
  const [editing, setEditing] = useState<Project | null>(null);
  const [saving, setSaving] = useState(false);
  const [formError, setFormError] = useState<string | null>(null);

  const fetchProjects = useCallback(async () => {
    try {
      const session = await getSession();
      if (!session || session.user.role !== "admin") {
        window.location.href = "/auth/signin?callbackUrl=/admin/projects";
        return;
      }
      const data = await adminGetProjects();
      setProjects(data);
    } catch {
      setError("Gagal memuat proyek.");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => { fetchProjects(); }, [fetchProjects]);

  const handleCreate = async (formData: FormData) => {
    setFormError(null);
    setSaving(true);
    try {
      const featuresRaw = formData.get("features") as string;
      await adminCreateProject({
        slug: formData.get("slug") as string,
        number: formData.get("number") as string,
        type: formData.get("type") as string,
        title: formData.get("title") as string,
        location: formData.get("location") as string,
        year: formData.get("year") as string,
        area: formData.get("area") as string,
        category: formData.get("category") as string,
        image_url: formData.get("image_url") as string,
        alt_text: (formData.get("alt_text") as string) || null,
        description: formData.get("description") as string,
        short_description: (formData.get("short_description") as string) || null,
        features: featuresRaw.split(",").map((f) => f.trim()).filter(Boolean),
        challenges: (formData.get("challenges") as string) || null,
        timeline: (formData.get("timeline") as string) || null,
        display_order: Number(formData.get("display_order")) || 0,
        is_featured: formData.get("is_featured") === "on",
        is_active: formData.get("is_active") === "on",
        meta_title: (formData.get("meta_title") as string) || null,
        meta_description: (formData.get("meta_description") as string) || null,
      });
      setOpen(false);
      setEditing(null);
      await fetchProjects();
    } catch {
      setFormError("Gagal menyimpan proyek.");
    } finally {
      setSaving(false);
    }
  };

  const handleUpdate = async (formData: FormData) => {
    if (!editing) return;
    setFormError(null);
    setSaving(true);
    try {
      const featuresRaw = formData.get("features") as string;
      await adminUpdateProject(editing.id, {
        slug: formData.get("slug") as string,
        number: formData.get("number") as string,
        type: formData.get("type") as string,
        title: formData.get("title") as string,
        location: formData.get("location") as string,
        year: formData.get("year") as string,
        area: formData.get("area") as string,
        category: formData.get("category") as string,
        image_url: formData.get("image_url") as string,
        alt_text: (formData.get("alt_text") as string) || null,
        description: formData.get("description") as string,
        short_description: (formData.get("short_description") as string) || null,
        features: featuresRaw.split(",").map((f) => f.trim()).filter(Boolean),
        challenges: (formData.get("challenges") as string) || null,
        timeline: (formData.get("timeline") as string) || null,
        display_order: Number(formData.get("display_order")) || 0,
        is_featured: formData.get("is_featured") === "on",
        is_active: formData.get("is_active") === "on",
        meta_title: (formData.get("meta_title") as string) || null,
        meta_description: (formData.get("meta_description") as string) || null,
      });
      setOpen(false);
      setEditing(null);
      await fetchProjects();
    } catch {
      setFormError("Gagal memperbarui proyek.");
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async (id: string) => {
    try {
      await adminDeleteProject(id);
      await fetchProjects();
    } catch {
      setError("Gagal menghapus proyek.");
    }
  };

  if (loading) return (
    <main className="min-h-screen bg-[var(--color-bg)] text-[var(--color-text)] flex items-center justify-center">
      <Section><Body>Memuat...</Body></Section>
    </main>
  );

  return (
    <main className="min-h-screen bg-[var(--color-bg)] text-[var(--color-text)]">
      <Section padding="xl" background="default">
        <div className="flex items-center justify-between mb-8">
          <div>
            <Caption accent>Kelola proyek</Caption>
            <Heading level={1} display className="mt-2">Proyek</Heading>
          </div>
          <Button variant="primary" size="sm" onClick={() => { setEditing(null); setOpen(true); }}>
            Tambah proyek
          </Button>
        </div>

        {error && (
          <div className="mb-6 rounded-lg bg-red/5 p-4 text-sm text-red border border-red/20">
            {error} <button onClick={() => { setError(null); fetchProjects(); }} className="ml-2 underline underline-offset-4">Coba lagi</button>
          </div>
        )}

        <div className="rounded-xl border border-[var(--color-border)] border-opacity-10 overflow-hidden">
          <table className="w-full text-left">
            <thead>
              <tr className="border-b border-[var(--color-border)] border-opacity-10 bg-[var(--color-step-bg)]/50">
                <th className="px-5 py-3 text-[var(--color-muted-taupe)] text-xs font-semibold uppercase tracking-wider">No</th>
                <th className="px-5 py-3 text-[var(--color-muted-taupe)] text-xs font-semibold uppercase tracking-wider">Judul</th>
                <th className="px-5 py-3 text-[var(--color-muted-taupe)] text-xs font-semibold uppercase tracking-wider">Kategori</th>
                <th className="px-5 py-3 text-[var(--color-muted-taupe)] text-xs font-semibold uppercase tracking-wider text-center">Aktif</th>
                <th className="px-5 py-3 text-[var(--color-muted-taupe)] text-xs font-semibold uppercase tracking-wider text-center">Aksi</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[var(--color-border)] divide-opacity-10">
              {projects.map((p) => (
                <tr key={p.id} className="hover:bg-[var(--color-step-bg)]/30 transition-colors">
                  <td className="px-5 py-4 text-sm text-[var(--color-muted)]">{p.number}</td>
                  <td className="px-5 py-4 text-sm text-[var(--color-text)]">{p.title}</td>
                  <td className="px-5 py-4 text-sm text-[var(--color-muted)]">{p.category}</td>
                  <td className="px-5 py-4 text-center">
                    <span className={`inline-flex h-5 w-5 items-center rounded-full ${p.is_active ? "bg-green/20 text-green border border-green/30" : "bg-[var(--color-muted)]/20 text-[var(--color-muted)] border border-[var(--color-muted)]/30"}`}>
                      <span className="text-[10px] font-bold">{p.is_active ? "Aktif" : "Nonaktif"}</span>
                    </span>
                  </td>
                  <td className="px-5 py-4 text-center space-x-2">
                    <Button variant="ghost" size="sm" onClick={() => { setEditing(p); setOpen(true); }}>Edit</Button>
                    <Button variant="ghost" size="sm" onClick={() => handleDelete(p.id)}>Hapus</Button>
                  </td>
                </tr>
              ))}
              {projects.length === 0 && (
                <tr><td colSpan={5} className="px-5 py-12 text-center text-[var(--color-muted)]">Belum ada proyek.</td></tr>
              )}
            </tbody>
          </table>
        </div>

        <div className={`fixed inset-0 z-50 ${open ? "flex" : "hidden"} items-center justify-center`}>
          <div className="fixed inset-0 bg-black/40 backdrop-blur-sm" onClick={() => setOpen(false)} />
          <div className="relative bg-[var(--color-card)] rounded-2xl border border-[var(--color-border)] border-opacity-20 p-6 lg:p-8 max-w-md w-full mx-4 shadow-2xl">
            <div className="flex items-center justify-between mb-6">
              <Heading level={2} className="text-xl">{editing ? "Edit proyek" : "Tambah proyek"}</Heading>
              <Button variant="ghost" size="sm" onClick={() => setOpen(false)}>Tutup</Button>
            </div>
            {formError && <div className="mb-4 rounded-lg bg-red/5 p-3 text-sm text-red border border-red/20">{formError}</div>}
            <form onSubmit={(e) => { e.preventDefault(); (editing ? handleUpdate : handleCreate)(new FormData(e.currentTarget)); }} className="space-y-4">
              <div className="space-y-2"><Label required>Judul</Label><input name="title" defaultValue={editing?.title ?? ""} required className="flex h-10 w-full rounded-lg border border-[var(--color-border)] border-opacity-20 bg-[var(--color-card)] px-3 py-2 text-sm text-[var(--color-text)] focus:outline-none focus:ring-2 focus:ring-[var(--color-accent)]" /></div>
              <div className="space-y-2"><Label required>Slug</Label><input name="slug" defaultValue={editing?.slug ?? ""} required className="flex h-10 w-full rounded-lg border border-[var(--color-border)] border-opacity-20 bg-[var(--color-card)] px-3 py-2 text-sm text-[var(--color-text)] focus:outline-none focus:ring-2 focus:ring-[var(--color-accent)]" /></div>
              <div className="space-y-2"><Label required>Kategori</Label><input name="category" defaultValue={editing?.category ?? ""} required className="flex h-10 w-full rounded-lg border border-[var(--color-border)] border-opacity-20 bg-[var(--color-card)] px-3 py-2 text-sm text-[var(--color-text)] focus:outline-none focus:ring-2 focus:ring-[var(--color-accent)]" /></div>
              <div className="space-y-2"><Label required>Lokasi</Label><input name="location" defaultValue={editing?.location ?? ""} required className="flex h-10 w-full rounded-lg border border-[var(--color-border)] border-opacity-20 bg-[var(--color-card)] px-3 py-2 text-sm text-[var(--color-text)] focus:outline-none focus:ring-2 focus:ring-[var(--color-accent)]" /></div>
              <div className="space-y-2"><Label required>Gambar URL</Label><input name="image_url" type="url" defaultValue={editing?.image_url ?? ""} required className="flex h-10 w-full rounded-lg border border-[var(--color-border)] border-opacity-20 bg-[var(--color-card)] px-3 py-2 text-sm text-[var(--color-text)] focus:outline-none focus:ring-2 focus:ring-[var(--color-accent)]" /></div>
              <div className="space-y-2"><Label>Deskripsi singkat</Label><input name="short_description" defaultValue={editing?.short_description ?? ""} className="flex h-10 w-full rounded-lg border border-[var(--color-border)] border-opacity-20 bg-[var(--color-card)] px-3 py-2 text-sm text-[var(--color-text)] focus:outline-none focus:ring-2 focus:ring-[var(--color-accent)]" /></div>
              <div className="space-y-2"><Label>Fitur (pisahkan koma)</Label><input name="features" defaultValue={(editing?.features ?? []).join(", ")} className="flex h-10 w-full rounded-lg border border-[var(--color-border)] border-opacity-20 bg-[var(--color-card)] px-3 py-2 text-sm text-[var(--color-text)] focus:outline-none focus:ring-2 focus:ring-[var(--color-accent)]" /></div>
              <label className="flex items-center gap-2"><input name="is_active" type="checkbox" defaultChecked={editing?.is_active ?? true} className="rounded border-[var(--color-border)] text-[var(--color-accent)] focus:ring-[var(--color-accent)]" /><span className="text-sm text-[var(--color-text)]">Aktif</span></label>
              <div className="flex items-center justify-end gap-3 mt-6">
                <Button variant="secondary" size="sm" onClick={() => setOpen(false)}>Batal</Button>
                <Button variant="primary" size="sm" disabled={saving}>{saving ? "Menyimpan..." : editing ? "Perbarui" : "Simpan"}</Button>
              </div>
            </form>
          </div>
        </div>
      </Section>
    </main>
  );
}
