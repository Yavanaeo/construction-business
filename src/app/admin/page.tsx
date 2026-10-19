import { auth } from "@/lib/auth";
import { getDashboardStats, getRecentActivity } from "@/lib/actions/admin";
import { redirect } from "next/navigation";
import { Section } from "@/components/ui/Section";
import { Heading, Body, Caption } from "@/components/ui/Typography";
import { Card } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";
import Link from "next/link";

export const metadata = {
  title: "Dashboard Admin · LineHouse",
  description: "Dashboard administrasi LineHouse.",
};

export default async function AdminDashboardPage() {
  const session = await auth();
  if (!session || session.user.role !== "admin") {
    redirect("/auth/signin?callbackUrl=/admin");
  }

  const [stats, activity] = await Promise.all([getDashboardStats(), getRecentActivity()]);

  return (
    <main className="min-h-screen bg-[var(--color-bg)] text-[var(--color-text)]">
      <Section padding="xl" background="default">
        <div className="flex items-center justify-between mb-8">
          <div>
            <Caption accent>Administrasi</Caption>
            <Heading level={1} display className="mt-2">Dashboard</Heading>
            <Body size="sm" muted className="mt-2">Kelola layanan, proyek, pelanggan, dan pesan masuk.</Body>
          </div>
          <div className="flex items-center gap-3">
            <Button variant="secondary" size="sm" href="/admin/projects">
              Kelola proyek
            </Button>
          </div>
        </div>

        <div className="mt-10 grid gap-4 sm:mt-12 sm:gap-6 lg:grid-cols-4">
          <Card variant="glass" className="p-5 lg:p-6">
            <Caption className="text-white/45 uppercase tracking-wider text-xs font-semibold">Total layanan</Caption>
            <Heading level={3} className="mt-2 text-white font-semibold">{stats.totalServices}</Heading>
          </Card>
          <Card variant="glass" className="p-5 lg:p-6">
            <Caption className="text-white/45 uppercase tracking-wider text-xs font-semibold">Total proyek</Caption>
            <Heading level={3} className="mt-2 text-white font-semibold">{stats.totalProjects}</Heading>
          </Card>
          <Card variant="glass" className="p-5 lg:p-6">
            <Caption className="text-white/45 uppercase tracking-wider text-xs font-semibold">Pesan baru</Caption>
            <Heading level={3} className="mt-2 text-white font-semibold">{stats.newContacts}</Heading>
          </Card>
          <Card variant="glass" className="p-5 lg:p-6">
            <Caption className="text-white/45 uppercase tracking-wider text-xs font-semibold">Total pelanggan</Caption>
            <Heading level={3} className="mt-2 text-white font-semibold">{stats.totalCustomers}</Heading>
          </Card>
        </div>

        <div className="mt-14 lg:mt-20 grid gap-10 lg:grid-cols-[1.35fr_0.65fr]">
          <div className="space-y-8">
            <div>
              <Caption accent>Aktivitas terbaru</Caption>
              <Heading level={2} display className="mt-2">Log aktivitas</Heading>
            </div>
            <div className="rounded-xl border border-[var(--color-border)] border-opacity-10 bg-[var(--color-card)] overflow-hidden">
              <table className="w-full text-left">
                <thead>
                  <tr className="border-b border-[var(--color-border)] border-opacity-10 bg-[var(--color-step-bg)]/50">
                    <th className="px-5 py-3 text-[var(--color-muted-taupe)] text-xs font-semibold uppercase tracking-wider">Waktu</th>
                    <th className="px-5 py-3 text-[var(--color-muted-taupe)] text-xs font-semibold uppercase tracking-wider">Tindakan</th>
                    <th className="px-5 py-3 text-[var(--color-muted-taupe)] text-xs font-semibold uppercase tracking-wider">Entitas</th>
                    <th className="px-5 py-3 text-[var(--color-muted-taupe)] text-xs font-semibold uppercase tracking-wider">Pengguna</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-[var(--color-border)] divide-opacity-10">
                  {activity.length === 0 ? (
                    <tr>
                      <td colSpan={4} className="px-5 py-8 text-center text-[var(--color-muted)]">Belum ada aktivitas tercatat.</td>
                    </tr>
                  ) : (
                    activity.map((item) => (
                      <tr key={item.id}>
                        <td className="px-5 py-4 text-sm text-[var(--color-muted)]">
                          {new Date(item.created_at).toLocaleDateString("id-ID", { day: "numeric", month: "short", year: "numeric", hour: "2-digit", minute: "2-digit" })}
                        </td>
                        <td className="px-5 py-4 text-sm text-[var(--color-text)]">{item.action}</td>
                        <td className="px-5 py-4 text-sm text-[var(--color-muted)]">{item.entity_type}</td>
                        <td className="px-5 py-4 text-sm text-[var(--color-muted)]">{item.user_name ?? item.user_email}</td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>
          </div>

          <div className="space-y-6">
            <div className="rounded-xl border border-[var(--color-border)] border-opacity-10 bg-[var(--color-card)] p-5 lg:p-6">
              <Caption accent>Ringkasan pengguna</Caption>
              <Heading level={3} className="mt-2 mb-4">Distribusi peran</Heading>
              <div className="space-y-3">
                {[
                  { label: "Admin", value: stats.adminUsers },
                  { label: "Staff", value: stats.staffUsers },
                  { label: "Pelanggan", value: stats.customerUsers },
                ].map((item) => (
                  <div key={item.label} className="flex items-center justify-between pb-2">
                    <Body size="sm" className="text-[var(--color-muted)]">{item.label}</Body>
                    <Body size="sm" className="text-[var(--color-text)] font-medium">{item.value}</Body>
                  </div>
                ))}
              </div>
            </div>
            <div className="flex items-center gap-3">
              <Button variant="primary" size="sm" href="/admin/services" className="flex-1">
                Kelola layanan
              </Button>
              <Button variant="secondary" size="sm" href="/admin/contact" className="flex-1">
                Masuk masuk
              </Button>
            </div>
          </div>
        </div>
      </Section>
    </main>
  );
}
