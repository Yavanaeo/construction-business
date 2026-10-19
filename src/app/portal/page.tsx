import { auth } from "@/lib/auth";
import { getCustomerDashboardStats, getCustomerProjects } from "@/lib/actions/customer";
import { redirect } from "next/navigation";
import { Section } from "@/components/ui/Section";
import { Heading, Body, Caption } from "@/components/ui/Typography";
import { Card, CardContent } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";
import Link from "next/link";

export const metadata = {
  title: "Portal Pelanggan · LineHouse",
  description: "Dashboard proyek dan kemajuan pembangunan pelanggan LineHouse.",
};

export default async function PortalPage() {
  const session = await auth();
  if (!session || session.user.role !== "customer") {
    redirect("/auth/signin?callbackUrl=/portal");
  }

  const [stats, projects] = await Promise.all([
    getCustomerDashboardStats(),
    getCustomerProjects(),
  ]);

  return (
    <main className="min-h-screen bg-[var(--color-bg)] text-[var(--color-text)]">
      <Section padding="xl" background="default">
        <div className="flex flex-col gap-6 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <Caption accent>Portal pelanggan</Caption>
            <Heading level={1} display className="mt-2">Selamat datang, {session.user.name ?? "Pelanggan"}.</Heading>
            <Body size="sm" muted className="mt-2">Kelola dan pantau proyek konstruksi Anda di sini.</Body>
          </div>
          <div className="flex items-center gap-3">
            <Button variant="secondary" size="sm" href="/portal/projects">
              Lihat semua proyek
            </Button>
          </div>
        </div>

        <div className="mt-10 grid gap-4 sm:mt-12 sm:gap-6 lg:grid-cols-4">
          <Card variant="glass" className="p-5 lg:p-6">
            <Caption className="text-white/45 uppercase tracking-wider text-xs font-semibold">Total proyek</Caption>
            <Heading level={3} className="mt-2 text-white font-semibold"> {stats.totalProjects} </Heading>
          </Card>
          <Card variant="glass" className="p-5 lg:p-6">
            <Caption className="text-white/45 uppercase tracking-wider text-xs font-semibold">Pembaruan terbaru</Caption>
            <Heading level={3} className="mt-2 text-white font-semibold"> {stats.totalUpdates} </Heading>
          </Card>
          <Card variant="glass" className="p-5 lg:p-6">
            <Caption className="text-white/45 uppercase tracking-wider text-xs font-semibold">Profil lengkap</Caption>
            <Heading level={3} className="mt-2 text-white font-semibold">{stats.profileComplete ? "Ya" : "Belum"}</Heading>
          </Card>
          <Card variant="glass" className="p-5 lg:p-6">
            <Caption className="text-white/45 uppercase tracking-wider text-xs font-semibold">Peran</Caption>
            <Heading level={3} className="mt-2 text-white font-semibold capitalize">{session.user.role}</Heading>
          </Card>
        </div>

        <div className="mt-14 lg:mt-20">
          <div className="flex items-center justify-between mb-6">
            <div>
              <Caption accent>Proyek Anda</Caption>
              <Heading level={2} display className="mt-2">Proyek aktif</Heading>
            </div>
            <Link href="/portal/projects" className="inline-flex items-center gap-2 text-[var(--color-muted-taupe)] hover:text-[var(--color-accent)] transition-colors font-medium text-sm">
              Lihat semua <span aria-hidden="true">→</span>
            </Link>
          </div>

          {projects.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-16 text-center border border-dashed border-[var(--color-border)] border-opacity-20 rounded-2xl">
              <Caption className="text-[var(--color-muted)] mb-3">Belum ada proyek yang ditetapkan kepada Anda.</Caption>
              <Body size="sm" muted className="max-w-xs mb-6">Hubungi kami jika Anda merasa seharusnya memiliki akses ke proyek.</Body>
            </div>
          ) : (
            <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
              {projects.map((project) => (
                <Card key={project.id} variant="default" hover className="group">
                  <CardContent className="p-5 lg:p-6">
                    <div className="flex items-center justify-between mb-4">
                      <Caption className="text-[var(--color-muted-taupe)] uppercase tracking-wider text-xs font-semibold">{project.category}</Caption>
                      <span className="inline-flex h-6 items-center rounded-full border border-[var(--color-border)] border-opacity-20 px-2.5 text-xs text-[var(--color-text)]"> {project.role} </span>
                    </div>
                    <Heading level={3} className="text-lg font-semibold group-hover:text-[var(--color-accent)] transition-colors">{project.title}</Heading>
                    <Body size="sm" muted className="mt-2 line-clamp-2">{project.location} · {project.year}</Body>
                    <div className="mt-6 flex items-center gap-3">
                      <Link href={`/portal/projects/${project.slug}`} className="flex items-center gap-2 text-sm font-medium text-[var(--color-accent)] hover:underline">
                        Lihat detail <span aria-hidden="true">→</span>
                      </Link>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          )}
        </div>
      </Section>
    </main>
  );
}
