import { Section } from "@/components/ui/Section";
import { Heading, Body, Caption } from "@/components/ui/Typography";
import { GlassPanel } from "@/components/ui/GlassPanel";
import Image from "next/image";

export const metadata = {
  title: "Tentang LineHouse",
  description: "LineHouse — konstruksi dan renovasi premium di Subang, Jawa Barat. Membangun ruang yang selaras dengan kebutuhan dan karakter Anda.",
};

export default function AboutPage() {
  return (
    <main className="min-h-screen bg-[var(--color-bg)] text-[var(--color-text)]">
      <Section id="about" padding="xl" background="default">
        <div className="grid gap-12 lg:grid-cols-[1.1fr_0.9fr] lg:gap-24">
          <div>
            <Caption accent>Tentang kami</Caption>
            <Heading level={1} display className="mt-4 max-w-xl">
              Rumah bukan<br />
              <span className="text-[var(--color-accent)]">hanya bentuk.</span>
            </Heading>
            <Body size="md" muted lead className="mt-6 max-w-xl">
              LineHouse adalah studio konstruksi dan renovasi berdomisili di Subang, Jawa Barat. Kami percaya rumah yang baik bukan sekadar terlihat indah — rumah juga perlu nyaman digunakan, sesuai kebutuhan, dan terasa seperti milik penghuninya.
            </Body>
            <Body size="md" muted className="mt-6 max-w-xl">
              Dari perencanaan arsitektur hingga serah terima, kami menjalankan setiap proses dengan komunikasi yang jelas, perhatian pada detail, dan komitmen pada kualitas. Layanan kami mencakup bangun rumah, renovasi rumah, rekonstruksi, interior, dan eksterior.
            </Body>
          </div>

          <GlassPanel variant="card" className="p-6 lg:p-8">
            <Caption className="text-white/45 mb-4 block">Prinsip kami</Caption>
            <div className="grid gap-4">
              <div className="flex items-start gap-3">
                <span className="mt-[0.15rem] flex h-5 w-5 items-center justify-center rounded-full bg-[var(--color-accent-light)]/20 text-[var(--color-accent-light)] text-xs font-bold">
                  01
                </span>
                <div>
                  <Heading level={3} className="text-sm font-semibold text-white mb-1">Terarah</Heading>
                  <Body size="sm" muted className="text-white/70 leading-6">Proses dan kebutuhan dibahas dengan jelas sejak awal.</Body>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <span className="mt-[0.15rem] flex h-5 w-5 items-center justify-center rounded-full bg-[var(--color-accent-light)]/20 text-[var(--color-accent-light)] text-xs font-bold">
                  02
                </span>
                <div>
                  <Heading level={3} className="text-sm font-semibold text-white mb-1">Bermakna</Heading>
                  <Body size="sm" muted className="text-white/70 leading-6">Ruang mengikuti cara Anda hidup, bukan sebaliknya.</Body>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <span className="mt-[0.15rem] flex h-5 w-5 items-center justify-center rounded-full bg-[var(--color-accent-light)]/20 text-[var(--color-accent-light)] text-xs font-bold">
                  03
                </span>
                <div>
                  <Heading level={3} className="text-sm font-semibold text-white mb-1">Berkualitas</Heading>
                  <Body size="sm" muted className="text-white/70 leading-6">Material dan pengerjaan dipilih untuk awet dan nyaman.</Body>
                </div>
              </div>
            </div>
          </GlassPanel>
        </div>
      </Section>

      <Section padding="xl" background="muted">
        <div className="container grid gap-16 lg:grid-cols-2">
          <div className="relative aspect-[4/3] overflow-hidden bg-[var(--color-step-bg)]">
            <Image
              src="https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&w=1400&q=85"
              alt="Arsitektur rumah modern LineHouse"
              fill
              sizes="(max-width: 640px) 100vw, 50vw"
              className="object-cover"
              loading="lazy"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-black/10 to-transparent" />
          </div>
          <div>
            <Caption accent>Layanan utama</Caption>
            <Heading level={2} display className="mt-4">Apa yang kami tawarkan.</Heading>
            <Body size="md" muted lead className="mt-5 max-w-xl">
              Kami melayani seluruh siklus konstruksi dan renovasi, dari konsep awal hingga finishing akhir, dengan tim profesional dan pendekatan yang personal.
            </Body>
            <div className="mt-10 grid gap-4">
              <div className="flex items-center gap-3 p-4 rounded-xl border border-[var(--color-border)] border-opacity-10 bg-[var(--color-card)]">
                <span className="flex h-9 w-9 items-center justify-center rounded-full bg-[var(--color-accent)]/10 text-[var(--color-accent)] font-bold">B</span>
                <Body size="sm" className="leading-6">Bangun rumah — pembangunan baru dari perencanaan hingga selesai.</Body>
              </div>
              <div className="flex items-center gap-3 p-4 rounded-xl border border-[var(--color-border)] border-opacity-10 bg-[var(--color-card)]">
                <span className="flex h-9 w-9 items-center justify-center rounded-full bg-[var(--color-accent)]/10 text-[var(--color-accent)] font-bold">R</span>
                <Body size="sm" className="leading-6">Renovasi rumah — menyegarkan ruang dan memperbaiki fungsi.</Body>
              </div>
              <div className="flex items-center gap-3 p-4 rounded-xl border border-[var(--color-border)] border-opacity-10 bg-[var(--color-card)]">
                <span className="flex h-9 w-9 items-center justify-center rounded-full bg-[var(--color-accent)]/10 text-[var(--color-accent)] font-bold">K</span>
                <Body size="sm" className="leading-6">Rekonstruksi — menata ulang bangunan untuk kebutuhan jangka panjang.</Body>
              </div>
              <div className="flex items-center gap-3 p-4 rounded-xl border border-[var(--color-border)] border-opacity-10 bg-[var(--color-card)]">
                <span className="flex h-9 w-9 items-center justify-center rounded-full bg-[var(--color-accent)]/10 text-[var(--color-accent)] font-bold">IE</span>
                <Body size="sm" className="leading-6">Interior & eksterior — menyelaraskan dalam dan luar rumah.</Body>
              </div>
            </div>
          </div>
        </div>
      </Section>
    </main>
  );
}
