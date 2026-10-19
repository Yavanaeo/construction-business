import { getProjectBySlug } from "@/lib/data";
import { Section } from "@/components/ui/Section";
import { Heading, Body, Caption } from "@/components/ui/Typography";
import { Card, CardContent } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";
import Image from "next/image";
import { notFound } from "next/navigation";
import Link from "next/link";

export async function generateMetadata({ params }: { params: { slug: string } }) {
  const project = await getProjectBySlug(params.slug);
  if (!project) return { title: "Proyek tidak ditemukan · LineHouse" };
  return {
    title: `${project.title} · LineHouse`,
    description: project.short_description || project.description,
  };
}

export default async function ProjectDetailPage({ params }: { params: { slug: string } }) {
  const project = await getProjectBySlug(params.slug);
  if (!project) notFound();

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
              <div className="flex flex-wrap items-center gap-2 text-[var(--color-muted-taupe)] text-xs font-semibold uppercase tracking-wider mb-2">
                <span>{project.category}</span>
                <span>{project.year}</span>
                <span>{project.area}</span>
              </div>
              <Heading level={1} display className="text-[var(--color-text)] mb-4 max-w-3xl">
                {project.title}
              </Heading>
              <Body size="md" muted className="max-w-2xl text-[var(--color-text)]/85">
                {project.short_description}
              </Body>
            </div>
          </div>
        </div>
      </Section>

      <Section padding="xl" background="default">
        <div className="container grid gap-16 lg:grid-cols-[1fr_0.42fr] lg:gap-24">
          <div className="space-y-10">
            <div className="prose prose-lg max-w-none text-[var(--color-text)]">
              <p className="lead text-[var(--color-muted)]">{project.short_description}</p>
              {project.description.split("\n").filter(Boolean).map((para, i) => (
                <p key={i} className="mt-6 leading-7">{para}</p>
              ))}
            </div>

            {(project.features && project.features.length > 0) && (
              <div className="mt-2">
                <Caption className="text-[var(--color-muted-taupe)] uppercase tracking-wider font-semibold mb-4">
                  Fitur & spesifikasi
                </Caption>
                <div className="grid sm:grid-cols-2 gap-4">
                  {project.features.map((feature, i) => (
                    <div key={i} className="flex items-start gap-3">
                      <span className="mt-1 flex h-5 w-5 items-center justify-center rounded-full bg-[var(--color-accent)]/10 text-[var(--color-accent)] text-xs font-bold">
                        ✓
                      </span>
                      <Body size="sm" className="leading-6">{feature}</Body>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {(project.challenges || project.timeline) && (
              <Card variant="glass" className="mt-8 p-6 lg:p-8">
                {project.challenges && (
                  <>
                    <Caption className="text-[var(--color-muted-taupe)] uppercase tracking-wider font-semibold mb-3">
                      Tantangan pengerjaan
                    </Caption>
                    <Body size="sm" className="mb-4">{project.challenges}</Body>
                  </>
                )}
                {project.timeline && (
                  <>
                    <Caption className="text-[var(--color-muted-taupe)] uppercase tracking-wider font-semibold mb-3">
                      Timeline
                    </Caption>
                    <Body size="sm">{project.timeline}</Body>
                  </>
                )}
              </Card>
            )}
          </div>

          <div className="space-y-6">
            <div className="flex flex-col gap-3 text-right sm:text-left">
              <Caption className="text-[var(--color-muted-taupe)] uppercase tracking-wider font-semibold">
                Lokasi
              </Caption>
              <Body size="md">{project.location}</Body>
            </div>
            <div className="flex flex-col gap-3 text-right sm:text-left">
              <Caption className="text-[var(--color-muted-taupe)] uppercase tracking-wider font-semibold">
                Kategori
              </Caption>
              <Body size="md">{project.category}</Body>
            </div>
            <div className="flex flex-col gap-3 text-right sm:text-left">
              <Caption className="text-[var(--color-muted-taupe)] uppercase tracking-wider font-semibold">
                Luas bangunan
              </Caption>
              <Body size="md">{project.area}</Body>
            </div>
            <div className="flex flex-col gap-3 text-right sm:text-left">
              <Caption className="text-[var(--color-muted-taupe)] uppercase tracking-wider font-semibold">
                Tahun
              </Caption>
              <Body size="md">{project.year}</Body>
            </div>
            <div className="pt-4 border-t border-[var(--color-border)] border-opacity-10">
              <Button variant="secondary" size="lg" href="/contact" className="w-full sm:w-auto">
                Konsultasi proyek serupa
              </Button>
            </div>
          </div>
        </div>
      </Section>

      <Section padding="xl" background="muted">
        <div className="container text-center">
          <Caption accent>Kembali ke koleksi</Caption>
          <Heading level={2} display className="mt-4 mb-10">Lihat proyek lainnya.</Heading>
          <div className="flex justify-center gap-3">
            <Link href="/projects" className="inline-flex items-center gap-2 text-[var(--color-muted-taupe)] hover:text-[var(--color-text)] transition-colors font-medium">
              Semua proyek <span aria-hidden="true">←</span>
            </Link>
          </div>
        </div>
      </Section>
    </main>
  );
}
