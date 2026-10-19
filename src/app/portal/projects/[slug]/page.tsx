import { auth } from "@/lib/auth";
import { getCustomerProjectBySlug, getProjectUpdates } from "@/lib/actions/customer";
import { redirect, notFound } from "next/navigation";
import { Section } from "@/components/ui/Section";
import { Heading, Body, Caption } from "@/components/ui/Typography";
import { Card } from "@/components/ui/Card";
import Image from "next/image";
import Link from "next/link";

export async function generateMetadata({ params }: { params: { slug: string } }) {
  const session = await auth();
  if (!session || session.user.role !== "customer") return { title: "Portal · LineHouse" };
  const project = await getCustomerProjectBySlug(params.slug);
  if (!project) return { title: "Proyek tidak ditemukan · LineHouse" };
  return { title: `${project.title} · Portal LineHouse`, description: project.short_description };
}

export default async function PortalProjectDetailPage({ params }: { params: { slug: string } }) {
  const session = await auth();
  if (!session || session.user.role !== "customer") {
    redirect("/auth/signin?callbackUrl=/portal/projects");
  }

  const project = await getCustomerProjectBySlug(params.slug);
  if (!project) notFound();

  const updates = await getProjectUpdates(project.id);

  return (
    <main className="min-h-screen bg-[var(--color-bg)] text-[var(--color-text)]">
      <Section padding="none">
        <div className="relative aspect-[16/9] overflow-hidden bg-[var(--color-muted-light)]">
          <Image
            src={project.image_url}
            alt={project.alt_text || project.title}
            fill
            sizes="100vw"
            className="object-cover"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[var(--color-bg)]/95 via-[var(--color-bg)]/40 to-transparent" />
          <div className="absolute bottom-0 left-0 right-0 p-6 lg:p-10 pb-12">
            <div className="container">
              <Link href="/portal/projects" className="inline-flex items-center gap-2 text-[var(--color-muted-taupe)] text-xs font-semibold uppercase tracking-wider mb-2 block hover:text-[var(--color-accent)] transition-colors">
                Kembali ke daftar proyek <span aria-hidden="true">←</span>
              </Link>
              <div className="flex items-center gap-2 mb-2">
                <Caption className="text-[var(--color-muted-taupe)] uppercase tracking-wider text-xs font-semibold">{project.category}</Caption>
                <span className="w-1 h-1 rounded-full bg-[var(--color-muted-taupe)]" aria-hidden="true" />
                <Caption className="text-[var(--color-muted-taupe)] text-xs">{project.year}</Caption>
              </div>
              <Heading level={1} display className="text-[var(--color-text)] mb-4 max-w-3xl">{project.title}</Heading>
            </div>
          </div>
        </div>
      </Section>

      <Section padding="xl" background="default">
        <div className="container grid gap-12 lg:grid-cols-[0.62fr_0.38fr] lg:gap-20">
          <div className="space-y-10">
            <div className="prose prose-lg max-w-none text-[var(--color-text)]">
              <p className="lead text-[var(--color-muted)]">{project.short_description}</p>
              {project.description.split("\n").filter(Boolean).map((para, i) => (
                <p key={i} className="mt-6 leading-7">{para}</p>
              ))}
            </div>
          </div>

          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <div>
                <Caption accent>Kemajuan proyek</Caption>
                <Heading level={2} display className="mt-2">Pembaruan terbaru</Heading>
              </div>
            </div>

            {updates.length === 0 ? (
              <div className="rounded-xl border border-[var(--color-border)] border-opacity-15 bg-[var(--color-card)] p-8 lg:p-10 text-center">
                <Caption className="text-[var(--color-muted)]">Belum ada pembaruan proyek saat ini.</Caption>
              </div>
            ) : (
              <div className="space-y-5">
                {updates.map((update) => (
                  <Card key={update.id} variant="default">
                    <div className="p-5 lg:p-6">
                      <div className="flex flex-wrap items-center gap-2 mb-2">
                        <Caption className="text-xs font-semibold uppercase tracking-wider">{update.update_type}</Caption>
                        {update.progress_percentage != null && (
                          <span className="inline-flex h-6 items-center rounded-full border border-[var(--color-border)] border-opacity-20 px-2.5 text-xs text-[var(--color-text)]">
                            {update.progress_percentage}%
                          </span>
                        )}
                      </div>
                      <Heading level={3} className="text-base font-semibold">{update.title}</Heading>
                      <Body size="sm" muted className="mt-2 line-clamp-3">{update.content}</Body>
                      <div className="mt-4 flex items-center gap-2 text-[var(--color-muted)] text-xs">
                        <Caption>{new Date(update.created_at).toLocaleDateString("id-ID", { day: "numeric", month: "long", year: "numeric" })}</Caption>
                      </div>
                    </div>
                  </Card>
                ))}
              </div>
            )}
          </div>
        </div>

        <div className="mt-16 border-t border-[var(--color-border)] border-opacity-10 pt-12">
          <div className="container flex items-center justify-between">
            <Body size="sm" muted>LineHouse Portal · Akses hanya untuk pemilik proyek yang terotorisasi.</Body>
            <Link href="/portal" className="text-sm font-medium text-[var(--color-accent)] hover:underline">Kembali ke dashboard</Link>
          </div>
        </div>
      </Section>
    </main>
  );
}
