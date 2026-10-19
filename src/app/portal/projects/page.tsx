import { auth } from "@/lib/auth";
import { getCustomerProjects, getProjectUpdates } from "@/lib/actions/customer";
import { redirect } from "next/navigation";
import { Section } from "@/components/ui/Section";
import { Heading, Body, Caption } from "@/components/ui/Typography";
import { Card } from "@/components/ui/Card";
import Link from "next/link";

export const metadata = {
  title: "Proyek Saya · LineHouse",
  description: "Daftar proyek pelanggan LineHouse.",
};

export default async function PortalProjectsPage() {
  const session = await auth();
  if (!session || session.user.role !== "customer") {
    redirect("/auth/signin?callbackUrl=/portal/projects");
  }

  const projects = await getCustomerProjects();

  return (
    <main className="min-h-screen bg-[var(--color-bg)] text-[var(--color-text)]">
      <Section padding="xl" background="default">
        <div className="flex items-center justify-between mb-8">
          <div>
            <Caption accent>Proyek Anda</Caption>
            <Heading level={1} display className="mt-2">Daftar proyek</Heading>
          </div>
          <Link href="/portal" className="inline-flex items-center gap-2 text-[var(--color-muted-taupe)] hover:text-[var(--color-accent)] transition-colors font-medium text-sm">
            Kembali ke dashboard <span aria-hidden="true">←</span>
          </Link>
        </div>

        {projects.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-20 text-center border border-dashed border-[var(--color-border)] border-opacity-20 rounded-2xl">
            <Caption className="text-[var(--color-muted)] mb-3">Belum ada proyek yang ditetapkan kepada Anda.</Caption>
          </div>
        ) : (
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {projects.map((project) => (
              <Card key={project.id} variant="default" hover>
                <div className="p-5 lg:p-6">
                  <div className="flex items-center justify-between mb-4">
                    <Caption className="text-[var(--color-muted-taupe)] uppercase tracking-wider text-xs font-semibold">{project.category}</Caption>
                    <span className="inline-flex h-6 items-center rounded-full border border-[var(--color-border)] border-opacity-20 px-2.5 text-xs text-[var(--color-text)]"> {project.role} </span>
                  </div>
                  <Heading level={3} className="text-lg font-semibold group-hover:text-[var(--color-accent)] transition-colors">{project.title}</Heading>
                  <Body size="sm" muted className="mt-2 line-clamp-2">{project.location} · {project.year} · {project.area}</Body>
                  <div className="mt-6">
                    <Link href={`/portal/projects/${project.slug}`} className="inline-flex items-center gap-2 text-sm font-medium text-[var(--color-accent)] hover:underline">
                      Lihat detail <span aria-hidden="true">→</span>
                    </Link>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        )}
      </Section>
    </main>
  );
}
