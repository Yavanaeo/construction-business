"use client";

import { useState, useEffect, useCallback } from "react";
import { Section } from "@/components/ui/Section";
import { Heading, Body, Caption, Label } from "@/components/ui/Typography";
import { Button } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";
import { getSession } from "@/lib/actions/session";
import {
  adminGetContactSubmissions,
  adminUpdateContactStatus,
} from "@/lib/actions/admin";

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
}

const statuses = ["new", "read", "replied", "archived"] as const;

export default function AdminContactPage() {
  const [submissions, setSubmissions] = useState<ContactSubmission[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchSubmissions = useCallback(async () => {
    try {
      const session = await getSession();
      if (!session || session.user.role !== "admin") {
        window.location.href = "/auth/signin?callbackUrl=/admin/contact";
        return;
      }
      const data = await adminGetContactSubmissions();
      setSubmissions(data);
    } catch {
      setError("Gagal memuat pesan masuk.");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => { fetchSubmissions(); }, [fetchSubmissions]);

  const handleStatusChange = async (id: string, status: string, notes: string | null) => {
    try {
      await adminUpdateContactStatus(id, status, notes ?? undefined);
      await fetchSubmissions();
    } catch {
      setError("Gagal memperbarui status.");
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
            <Caption accent>Pesan masuk</Caption>
            <Heading level={1} display className="mt-2">Kontak</Heading>
          </div>
        </div>

        {error && (
          <div className="mb-6 rounded-lg bg-red/5 p-4 text-sm text-red border border-red/20">
            {error} <button onClick={() => { setError(null); fetchSubmissions(); }} className="ml-2 underline underline-offset-4">Coba lagi</button>
          </div>
        )}

        <div className="rounded-xl border border-[var(--color-border)] border-opacity-10 overflow-hidden">
          <table className="w-full text-left">
            <thead>
              <tr className="border-b border-[var(--color-border)] border-opacity-10 bg-[var(--color-step-bg)]/50">
                <th className="px-5 py-3 text-[var(--color-muted-taupe)] text-xs font-semibold uppercase tracking-wider">Waktu</th>
                <th className="px-5 py-3 text-[var(--color-muted-taupe)] text-xs font-semibold uppercase tracking-wider">Nama</th>
                <th className="px-5 py-3 text-[var(--color-muted-taupe)] text-xs font-semibold uppercase tracking-wider">Email</th>
                <th className="px-5 py-3 text-[var(--color-muted-taupe)] text-xs font-semibold uppercase tracking-wider">Tipe proyek</th>
                <th className="px-5 py-3 text-[var(--color-muted-taupe)] text-xs font-semibold uppercase tracking-wider text-center">Status</th>
                <th className="px-5 py-3 text-[var(--color-muted-taupe)] text-xs font-semibold uppercase tracking-wider text-center">Aksi</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[var(--color-border)] divide-opacity-10">
              {submissions.map((s) => (
                <tr key={s.id}>
                  <td className="px-5 py-4 text-sm text-[var(--color-muted)]">{new Date(s.created_at).toLocaleDateString("id-ID", { day: "numeric", month: "short", year: "numeric" })}</td>
                  <td className="px-5 py-4 text-sm text-[var(--color-text)]">{s.name}</td>
                  <td className="px-5 py-4 text-sm text-[var(--color-muted)]">{s.email}</td>
                  <td className="px-5 py-4 text-sm text-[var(--color-muted)]">{s.project_type ?? "—"}</td>
                  <td className="px-5 py-4 text-center">
                    <span className={`inline-flex h-6 items-center rounded-full border px-2.5 text-xs ${s.status === "new" ? "bg-amber/50 text-amber border-amber/100" : "bg-[var(--color-muted)]/10 text-[var(--color-muted)] border-[var(--color-muted)]/20"}`}>
                      {s.status}
                    </span>
                  </td>
                  <td className="px-5 py-4 text-center">
                    <Button variant="ghost" size="sm" onClick={() => {
                      const next = prompt(`Ubah status "${s.status}" menjadi:`, s.status);
                      if (next && statuses.includes(next as any)) {
                        const notes = prompt("Catatan admin (opsional):", s.admin_notes ?? "");
                        handleStatusChange(s.id, next, notes ?? null);
                      }
                    }}>Ubah status</Button>
                  </td>
                </tr>
              ))}
              {submissions.length === 0 && (
                <tr><td colSpan={6} className="px-5 py-12 text-center text-[var(--color-muted)]">Belum ada pesan masuk.</td></tr>
              )}
            </tbody>
          </table>
        </div>
      </Section>
    </main>
  );
}
