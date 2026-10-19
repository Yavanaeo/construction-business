import { getProjects, getFeaturedProjects } from "@/lib/data";
import { Section } from "@/components/ui/Section";
import { Heading, Body, Caption } from "@/components/ui/Typography";
import { Button } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";
import Image from "next/image";
import Link from "next/link";

export const metadata = {
  title: "Proyek · LineHouse",
  description: "Koleksi proyek bangun rumah, renovasi, rekonstruksi, interior, dan eksterior LineHouse di Jawa Barat, Indonesia.",
};

export default async function ProjectsPage() {
  const [projects, featured] = await Promise.all([getProjects(), getFeaturedProjects()]);

  return (
    <main className="min-h-screen bg-[var(--color-bg)] text-[var(--color-text)]">
      <Section id="projects" padding="xl" background="default">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <Caption accent>Proyek kami</Caption>
            <Heading level={1} display className="mt-4">Ruang yang menginspirasi.</Heading>
          </div>
          <Body size="md" muted lead className="max-w-md">
            Referensi visual untuk membantu membayangkan karakter ruang yang bisa dikembangkan bersama LineHouse.
          </Body>
        </div>

        <div className="mt-12 grid gap-9 sm:mt-16 sm:gap-12 lg:mt-20 lg:grid-cols-3">
          {projects.map((project) => (
            <Card
              key={project.id}
              variant="project"
              className="overflow-hidden group"
            >
              <Link href={`/projects/${project.slug}`} className="block">
                <div className="relative aspect-[4/3] overflow-hidden bg-[var(--color-muted-light)]">
                  <Image
                    src={project.image_url}
                    alt={project.alt_text || project.title}
                    fill
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                    className="object-cover transition-transform duration-700 group-hover:scale-[1.03]"
                    loading="lazy"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/45 via-black/10 to-transparent" />
                  <div className="absolute bottom-5 left-5 text-white">
                    <Caption className="text-white/80 uppercase tracking-wider text-xs font-semibold">
                      {project.category}
                    </Caption>
                    <Heading level={3} className="mt-1 text-white sm:text-lg font-semibold">
                      {project.title}
                    </Heading>
                  </div>
                </div>
                <div className="mt-4 grid grid-cols-2 gap-4 text-[var(--color-muted)] text-sm">
                  <div className="flex items-center gap-2">
                    <span className="w-1 h-1 rounded-full bg-[var(--color-muted-taupe)]" aria-hidden="true" />
                    {project.location}
                  </div>
                  <div className="flex items-center gap-2 justify-end text-right">
                    <span className="w-1 h-1 rounded-full bg-[var(--color-muted-taupe)]" aria-hidden="true" />
                    {project.year}
                  </div>
                </div>
              </Link>
            </Card>
          ))}
        </div>

        {featured.length > 0 && (
          <div className="mt-16 border-t border-[var(--color-border)] border-opacity-10 pt-12 lg:mt-20 lg:pt-16">
            <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between mb-10">
              <div>
                <Caption accent>Direkomendasikan</Caption>
                <Heading level={2} display className="mt-4">Proyek unggulan.</Heading>
              </div>
              <Button variant="secondary" size="lg" href="/services">
                Kenali layanan
              </Button>
            </div>
            <div className="grid gap-9 lg:grid-cols-3">
              {featured.map((project) => (
                <Card key={project.id} variant="project" className="overflow-hidden group">
                  <Link href={`/projects/${project.slug}`} className="block">
                    <div className="relative aspect-[4/3] overflow-hidden bg-[var(--color-muted-light)]">
                      <Image
                        src={project.image_url}
                        alt={project.alt_text || project.title}
                        fill
                        sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                        className="object-cover transition-transform duration-700 group-hover:scale-[1.03]"
                        loading="lazy"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/45 via-black/10 to-transparent" />
                      <div className="absolute bottom-5 left-5 text-white">
                        <Caption className="text-white/80 uppercase tracking-wider text-xs font-semibold">
                          {project.category}
                        </Caption>
                        <Heading level={3} className="mt-1 text-white sm:text-lg font-semibold">
                          {project.title}
                        </Heading>
                      </div>
                    </div>
                  </Link>
                </Card>
              ))}
            </div>
          </div>
        )}
      </Section>
    </main>
  );
}
