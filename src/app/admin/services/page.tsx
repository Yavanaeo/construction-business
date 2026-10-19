"use client";

import { useState, useEffect, useCallback } from "react";
import { Section } from "@/components/ui/Section";
import { Heading, Body, Caption, Label } from "@/components/ui/Typography";
import { Button } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";
import { getSession } from "@/lib/actions/session";
import {
  adminGetServices,
  adminCreateService,
  adminUpdateService,
  adminDeleteService,
} from "@/lib/actions/admin";

interface Service {
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
}

export default function AdminServicesPage() {
  const [services, setServices] = useState<Service[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [open, setOpen] = useState(false);
  const [editing, setEditing] = useState<Service | null>(null);
  const [saving, setSaving] = useState(false);
  const [deletingId, setDeletingId] = useState<string | null>(null);
  const [formError, setFormError] = useState<string | null>(null);

  const fetchServices = useCallback(async () => {
    try {
      const session = await getSession();
      if (!session || session.user.role !== "admin") {
        window.location.href = "/auth/signin?callbackUrl=/admin/services";
        return;
      }
      const data = await adminGetServices();
      setServices(data);
    } catch {
      setError("Gagal memuat layanan.");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchServices();
  }, [fetchServices]);

  const handleCreate = async (formData: FormData) => {
    setFormError(null);
    setSaving(true);
    try {
      const featuresRaw = formData.get("features") as string;
      const features = featuresRaw.split(",").map((f) => f.trim()).filter(Boolean);
      await adminCreateService({
        slug: formData.get("slug") as string,
        number: formData.get("number") as string,
        title: formData.get("title") as string,
        description: formData.get("description") as string,
        short_description: (formData.get("short_description") as string) || null,
        icon: (formData.get("icon") as string) || null,
        features,
        display_order: Number(formData.get("display_order")) || 0,
        is_active: formData.get("is_active") === "on",
        meta_title: (formData.get("meta_title") as string) || null,
        meta_description: (formData.get("meta_description") as string) || null,
      });
      setOpen(false);
      setEditing(null);
      await fetchServices();
    } catch {
      setFormError("Gagal menyimpan layanan.");
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
      const features = featuresRaw.split(",").map((f) => f.trim()).filter(Boolean);
      await adminUpdateService(editing.id, {
        slug: formData.get("slug") as string,
        number: formData.get("number") as string,
        title: formData.get("title") as string,
        description: formData.get("description") as string,
        short_description: (formData.get("short_description") as string) || null,
        icon: (formData.get("icon") as string) || null,
        features,
        display_order: Number(formData.get("display_order")) || 0,
        is_active: formData.get("is_active") === "on",
        meta_title: (formData.get("meta_title") as string) || null,
        meta_description: (formData.get("meta_description") as string) || null,
      });
      setOpen(false);
      setEditing(null);
      await fetchServices();
    } catch {
      setFormError("Gagal memperbarui layanan.");
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async (id: string) => {
    setDeletingId(id);
    try {
      await adminDeleteService(id);
      await fetchServices();
    } catch {
      setError("Gagal menghapus layanan.");
    } finally {
      setDeletingId(null);
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
            <Caption accent>Kelola layanan</Caption>
            <Heading level={1} display className="mt-2">Layanan</Heading>
          </div>
          <Button variant="primary" size="sm" onClick={() => { setEditing(null); setOpen(true); }}>
            Tambah layanan
          </Button>
        </div>

        {error && (
          <div className="mb-6 rounded-lg bg-red/5 p-4 text-sm text-red border border-red/20">
            {error} <button onClick={() => { setError(null); fetchServices(); }} className="ml-2 underline underline-offset-4">Coba lagi</button>
          </div>
        )}

        <div className="rounded-xl border border-[var(--color-border)] border-opacity-10 overflow-hidden">
          <table className="w-full text-left">
            <thead>
              <tr className="border-b border-[var(--color-border)] border-opacity-10 bg-[var(--color-step-bg)]/50">
                <th className="px-5 py-3 text-[var(--color-muted-taupe)] text-xs font-semibold uppercase tracking-wider">No</th>
                <th className="px-5 py-3 text-[var(--color-muted-taupe)] text-xs font-semibold uppercase tracking-wider">Judul</th>
                <th className="px-5 py-3 text-[var(--color-muted-taupe)] text-xs font-semibold uppercase tracking-wider">Slug</th>
                <th className="px-5 py-3 text-[var(--color-muted-taupe)] text-xs font-semibold uppercase tracking-wider text-center">Aktif</th>
                <th className="px-5 py-3 text-[var(--color-muted-taupe)] text-xs font-semibold uppercase tracking-wider text-center">Aksi</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[var(--color-border)] divide-opacity-10">
              {services.map((svc) => (
                <tr key={svc.id} className="hover:bg-[var(--color-step-bg)]/30 transition-colors">
                  <td className="px-5 py-4 text-sm text-[var(--color-muted)]">{svc.number}</td>
                  <td className="px-5 py-4 text-sm text-[var(--color-text)]">{svc.title}</td>
                  <td className="px-5 py-4 text-sm text-[var(--color-muted)]">{svc.slug}</td>
                  <td className="px-5 py-4 text-center">
                    <span className={`inline-flex h-5 w-5 items-center rounded-full ${svc.is_active ? "bg-green/20 text-green border border-green/30" : "bg-[var(--color-muted)]/20 text-[var(--color-muted)] border border-[var(--color-muted)]/30"}`}>
                      <span className="text-[10px] font-bold">{svc.is_active ? "Aktif" : "Nonaktif"}</span>
                    </span>
                  </td>
                  <td className="px-5 py-4 text-center space-x-2">
                    <Button variant="ghost" size="sm" onClick={() => { setEditing(svc); setOpen(true); }}>
                      Edit
                    </Button>
                    <Button variant="ghost" size="sm" onClick={() => handleDelete(svc.id)} disabled={deletingId === svc.id}>
                      {deletingId === svc.id ? "Menghapus..." : "Hapus"}
                    </Button>
                  </td>
                </tr>
              ))}
              {services.length === 0 && (
                <tr>
                  <td colSpan={5} className="px-5 py-12 text-center text-[var(--color-muted)]">Belum ada layanan.</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        <div className={`fixed inset-0 z-50 ${open ? "flex" : "hidden"} items-center justify-center`}>
          <div className="fixed inset-0 bg-black/40 backdrop-blur-sm" onClick={() => setOpen(false)} />
          <div className="relative bg-[var(--color-card)] rounded-2xl border border-[var(--color-border)] border-opacity-20 p-6 lg:p-8 max-w-md w-full mx-4 shadow-2xl">
            <div className="flex items-center justify-between mb-6">
              <Heading level={2} className="text-xl">{editing ? "Edit layanan" : "Tambah layanan"}</Heading>
              <Button variant="ghost" size="sm" onClick={() => setOpen(false)}>Tutup</Button>
            </div>
            {formError && (
              <div className="mb-4 rounded-lg bg-red/5 p-3 text-sm text-red border border-red/20">{formError}</div>
            )}
            <form onSubmit={(e) => { e.preventDefault(); (editing ? handleUpdate : handleCreate)(new FormData(e.currentTarget)); }} className="space-y-4">
              <div className="space-y-2">
                <Label required>Judul</Label>
                <input name="title" defaultValue={editing?.title ?? ""} required className="flex h-10 w-full rounded-lg border border-[var(--color-border)] border-opacity-20 bg-[var(--color-card)] px-3 py-2 text-sm text-[var(--color-text)] focus:outline-none focus:ring-2 focus:ring-[var(--color-accent)]" />
              </div>
              <div className="space-y-2">
                <Label required>Slug</Label>
                <input name="slug" defaultValue={editing?.slug ?? ""} required className="flex h-10 w-full rounded-lg border border-[var(--color-border)] border-opacity-20 bg-[var(--color-card)] px-3 py-2 text-sm text-[var(--color-text)] focus:outline-none focus:ring-2 focus:ring-[var(--color-accent)]" />
              </div>
              <div className="space-y-2">
                <Label required>Nomor</Label>
                <input name="number" type="number" defaultValue={editing?.number ?? ""} required className="flex h-10 w-full rounded-lg border border-[var(--color-border)] border-opacity-20 bg-[var(--color-card)] px-3 py-2 text-sm text-[var(--color-text)] focus:outline-none focus:ring-2 focus:ring-[var(--color-accent)]" />
              </div>
              <div className="space-y-2">
                <Label>Deskripsi</Label>
                <textarea name="description" rows={3} defaultValue={editing?.description ?? ""} className="flex h-24 w-full rounded-lg border border-[var(--color-border)] border-opacity-20 bg-[var(--color-card)] px-3 py-2 text-sm text-[var(--color-text)] focus:outline-none focus:ring-2 focus:ring-[var(--color-accent)]" />
              </div>
              <div className="space-y-2">
                <Label>Fitur (pisahkan dengan koma)</Label>
                <input name="features" defaultValue={(editing?.features ?? []).join(", ")} className="flex h-10 w-full rounded-lg border border-[var(--color-border)] border-opacity-20 bg-[var(--color-card)] px-3 py-2 text-sm text-[var(--color-text)] focus:outline-none focus:ring-2 focus:ring-[var(--color-accent)]" />
              </div>
              <label className="flex items-center gap-2">
                <input name="is_active" type="checkbox" defaultChecked={editing?.is_active ?? true} className="rounded border-[var(--color-border)] text-[var(--color-accent)] focus:ring-[var(--color-accent)]" />
                <span className="text-sm text-[var(--color-text)]">Aktif</span>
              </label>
              <div className="flex items-center justify-end gap-3 mt-6">
                <Button variant="secondary" size="sm" onClick={() => setOpen(false)}>Batal</Button>
                <Button variant="primary" size="sm" disabled={saving}>
                  {saving ? "Menyimpan..." : editing ? "Perbarui" : "Simpan"}
                </Button>
              </div>
            </form>
          </div>
        </div>
      </Section>
    </main>
  );
}
