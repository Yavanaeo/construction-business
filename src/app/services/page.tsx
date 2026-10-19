import { getServices } from "@/lib/data";
import { Section } from "@/components/ui/Section";
import { Heading, Body, Caption } from "@/components/ui/Typography";
import { Button } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";
import Image from "next/image";
import { notFound } from "next/navigation";

export const metadata = {
  title: "Layanan · LineHouse",
  description: "Bangun rumah, renovasi rumah, rekonstruksi, interior, dan eksterior di Subang, Jawa Barat. LineHouse melayani konstruksi premium dengan perhatian pada detail.",
};

export default async function ServicesPage() {
  const services = await getServices();

  if (services.length === 0) {
    return (
      <main className="min-h-screen bg-[var(--color-bg)] text-[var(--color-text)]">
        <Section padding="xl">
          <Heading level={1} display>Layanan kami sedang disiapkan.</Heading>
          <Body size="md" muted className="mt-4 max-w-xl">
            Mohon kembali nanti atau hubungi kami untuk informasi layanan.
          </Body>
        </Section>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-[var(--color-bg)] text-[var(--color-text)]">
      <Section id="services" padding="xl" background="default">
        <div className="grid gap-9 lg:grid-cols-[0.7fr_1.3fr] lg:gap-20">
          <div>
            <Caption accent>Layanan kami</Caption>
            <Heading level={1} display className="mt-4 max-w-xl">
              Dari rencana<br />
              menjadi nyata.
            </Heading>
            <Body size="md" muted lead className="mt-5 max-w-sm">
              Setiap rumah punya kebutuhan berbeda. Kami membantu menemukan pendekatan yang sesuai dengan ruang dan tujuan Anda.
            </Body>
          </div>

          <div className="space-y-4">
            {services.map((service) => (
              <Card
                key={service.id}
                variant="service"
                className="group border-t border-[var(--color-border)] border-opacity-15 first:border-0"
              >
                <div className="grid grid-cols-[34px_1fr] gap-3 py-5 sm:grid-cols-[54px_1fr] sm:gap-5 sm:py-7">
                  <Caption accent className="pt-1 group-hover:text-[var(--color-accent)] transition-colors">
                    {service.number}
                  </Caption>
                  <div>
                    <Heading level={3} className="text-xl sm:text-2xl group-hover:text-[var(--color-text)] transition-colors">
                      {service.title}
                    </Heading>
                    <Body size="sm" muted className="mt-2 max-w-2xl">
                      {service.description}
                    </Body>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </div>

        <div className="mt-16 border-t border-[var(--color-border)] border-opacity-10 pt-12 lg:mt-20 lg:pt-16">
          <div className="text-center max-w-2xl mx-auto">
            <Caption accent className="mb-4">Siap memulai?</Caption>
            <Heading level={2} display className="mb-6">Mari wujudkan ruang impian Anda.</Heading>
            <div className="flex flex-col sm:flex-row gap-3 justify-center">
              <Button variant="primary" size="lg" href="/contact">
                Konsultasikan Proyek
              </Button>
              <Button variant="secondary" size="lg" href="/projects">
                Jelajahi Proyek
              </Button>
            </div>
          </div>
        </div>
      </Section>
    </main>
  );
}
