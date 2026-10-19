"use client";

import { useState, useEffect, useCallback } from "react";
import { Section } from "@/components/ui/Section";
import { Heading, Body, Caption } from "@/components/ui/Typography";
import { Button } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";
import { getSession } from "@/lib/actions/session";
import { adminGetCustomers } from "@/lib/actions/admin";

interface AdminCustomer {
  id: string;
  user_id: string;
  phone: string | null;
  address: string | null;
  city: string | null;
  province: string | null;
  company_name: string | null;
  created_at: string;
  user: { id: string; email: string; name: string | null; role: string };
}

export default function AdminCustomersPage() {
  const [customers, setCustomers] = useState<AdminCustomer[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchCustomers = useCallback(async () => {
    try {
      const session = await getSession();
      if (!session || session.user.role !== "admin") {
        window.location.href = "/auth/signin?callbackUrl=/admin/customers";
        return;
      }
      const data = await adminGetCustomers();
      setCustomers(data);
    } catch {
      setError("Gagal memuat pelanggan.");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => { fetchCustomers(); }, [fetchCustomers]);

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
            <Caption accent>Manajemen pelanggan</Caption>
            <Heading level={1} display className="mt-2">Pelanggan</Heading>
          </div>
        </div>

        {error && (
          <div className="mb-6 rounded-lg bg-red/5 p-4 text-sm text-red border border-red/20">
            {error} <button onClick={() => { setError(null); fetchCustomers(); }} className="ml-2 underline underline-offset-4">Coba lagi</button>
          </div>
        )}

        <div className="rounded-xl border border-[var(--color-border)] border-opacity-10 overflow-hidden">
          <table className="w-full text-left">
            <thead>
              <tr className="border-b border-[var(--color-border)] border-opacity-10 bg-[var(--color-step-bg)]/50">
                <th className="px-5 py-3 text-[var(--color-muted-taupe)] text-xs font-semibold uppercase tracking-wider">Nama</th>
                <th className="px-5 py-3 text-[var(--color-muted-taupe)] text-xs font-semibold uppercase tracking-wider">Email</th>
                <th className="px-5 py-3 text-[var(--color-muted-taupe)] text-xs font-semibold uppercase tracking-wider">Perusahaan</th>
                <th className="px-5 py-3 text-[var(--color-muted-taupe)] text-xs font-semibold uppercase tracking-wider">Kota / Provinsi</th>
                <th className="px-5 py-3 text-[var(--color-muted-taupe)] text-xs font-semibold uppercase tracking-wider">Terdaftar</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[var(--color-border)] divide-opacity-10">
              {customers.map((c) => (
                <tr key={c.id}>
                  <td className="px-5 py-4 text-sm text-[var(--color-text)]">{c.user.name ?? "—"}</td>
                  <td className="px-5 py-4 text-sm text-[var(--color-muted)]">{c.user.email}</td>
                  <td className="px-5 py-4 text-sm text-[var(--color-muted)]">{c.company_name ?? "—"}</td>
                  <td className="px-5 py-4 text-sm text-[var(--color-muted)]">{c.city ?? "—"} / {c.province ?? "—"}</td>
                  <td className="px-5 py-4 text-sm text-[var(--color-muted)]">{new Date(c.created_at).toLocaleDateString("id-ID")}</td>
                </tr>
              ))}
              {customers.length === 0 && (
                <tr><td colSpan={5} className="px-5 py-12 text-center text-[var(--color-muted)]">Belum ada pelanggan.</td></tr>
              )}
            </tbody>
          </table>
        </div>
      </Section>
    </main>
  );
}
