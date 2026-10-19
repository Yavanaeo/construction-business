"use client";

import { useState } from "react";
import Image from "next/image";
import { Button } from "@/components/ui/Button";
import { Section } from "@/components/ui/Section";
import { Card, CardContent } from "@/components/ui/Card";
import { Heading, Body, Caption, ArchNum } from "@/components/ui/Typography";
import { GlassPanel } from "@/components/ui/GlassPanel";
import { useScrollReveal, useScrollRevealMultiple } from "@/hooks/useScrollReveal";

const services = [
  { number: "01", title: "Renovasi Rumah", description: "Menyegarkan ruang, memperbaiki fungsi, dan memberi kehidupan baru pada rumah yang sudah ada." },
  { number: "02", title: "Bangun Rumah", description: "Mewujudkan rumah dari perencanaan hingga pengerjaan dengan perhatian pada kualitas dan detail." },
  { number: "03", title: "Rekonstruksi", description: "Menata ulang bangunan agar lebih sesuai dengan kebutuhan, kenyamanan, dan rencana jangka panjang." },
  { number: "04", title: "Interior & Eksterior", description: "Menyelaraskan bagian dalam dan luar rumah agar terasa utuh, nyaman, dan memiliki karakter." },
];

const projects = [
  {
    number: "01",
    type: "Arsitektur Hunian",
    title: "Rumah Modern Minimalis",
    location: "Bandung, Jawa Barat",
    year: "2024",
    image: "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&w=1400&q=85",
    alt: "Inspirasi rumah modern dengan material natural dan bukaan lebar",
    shape: "lg:col-span-7",
  },
  {
    number: "02",
    type: "Renovasi Total",
    title: "Rumah Warisan Kolonial",
    location: "Subang, Jawa Barat",
    year: "2023",
    image: "https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?auto=format&fit=crop&w=1200&q=85",
    alt: "Inspirasi interior ruang keluarga bernuansa hangat",
    shape: "lg:col-span-5 lg:mt-24",
  },
  {
    number: "03",
    type: "Rekonstruksi",
    title: "Villa Tepi Sawah",
    location: "Cimahi, Jawa Barat",
    year: "2024",
    image: "https://images.unsplash.com/photo-1600566753086-00f18fb6b3ea?auto=format&fit=crop&w=1400&q=85",
    alt: "Inspirasi detail interior villa dengan pemandangan sawah",
    shape: "lg:col-span-6 lg:col-start-4",
  },
];

const steps = [
  { number: "01", title: "Konsultasi", text: "Kami memahami kebutuhan, prioritas, dan gambaran ruang yang Anda inginkan." },
  { number: "02", title: "Perencanaan", text: "Ruang lingkup pekerjaan dan arah pengerjaan dibahas dengan jelas." },
  { number: "03", title: "Pengerjaan", text: "Pekerjaan dijalankan dengan perhatian pada detail dan komunikasi yang terarah." },
  { number: "04", title: "Serah Terima", text: "Hasil pekerjaan ditinjau bersama sebelum proyek diselesaikan." },
];

export default function Home() {
  const [menuOpen, setMenuOpen] = useState(false);
  const closeMenu = () => setMenuOpen(false);

  const navigation = [
    ["Beranda", "#home"],
    ["Layanan", "#services"],
    ["Proyek", "#projects"],
    ["Tentang", "#about"],
    ["Kontak", "#contact"],
  ];

  const [heroRef, heroVisible] = useScrollReveal({ delay: 100 });
  const [servicesRef, servicesVisible] = useScrollReveal({ delay: 150 });
  const [projectsRef, projectsVisible] = useScrollReveal({ delay: 150 });
  const [aboutRef, aboutVisible] = useScrollReveal({ delay: 150 });
  const [processRef, processVisible] = useScrollReveal({ delay: 150 });
  const [contactRef, contactVisible] = useScrollReveal({ delay: 150 });

  const [serviceRefs, serviceVisibilities] = useScrollRevealMultiple(services.length, { delay: 100, triggerOnce: true });
  const [projectRefs, projectVisibilities] = useScrollRevealMultiple(projects.length, { delay: 100, triggerOnce: true });
  const [stepRefs, stepVisibilities] = useScrollRevealMultiple(steps.length, { delay: 100, triggerOnce: true });

  return (
    <main className="min-h-screen overflow-x-clip bg-[var(--color-bg)] text-[var(--color-text)]">
      <header className="sticky top-0 z-50">
        <GlassPanel variant="nav" className="border-b border-[var(--color-border)]">
          <div className="container flex h-17 lg:h-20 items-center justify-between">
            <a href="#home" onClick={closeMenu} aria-label="LineHouse — ke halaman utama" className="shrink-0">
              <Image src="/images/linehouse-logo.svg" alt="LineHouse" width={120} height={40} className="h-8 w-auto sm:h-9" priority />
            </a>

            <nav aria-label="Navigasi utama" className="hidden items-center gap-7 lg:flex">
              {navigation.map(([label, href]) => (
                <a key={href} href={href} className="text-sm text-[var(--color-text-muted)] transition-colors hover:text-[var(--color-text)]">{label}</a>
              ))}
            </nav>

            <a href="#contact" className="hidden rounded-md bg-[var(--color-accent)] px-5 py-3 text-sm font-medium text-white transition-colors hover:bg-[var(--color-accent-light)] lg:inline-flex">
              Konsultasikan Proyek
            </a>

            <button
              type="button"
              onClick={() => setMenuOpen((open) => !open)}
              aria-label={menuOpen ? "Tutup menu" : "Buka menu"}
              aria-expanded={menuOpen}
              aria-controls="mobile-navigation"
              className="flex h-11 w-11 items-center justify-center rounded-md border border-[var(--color-border)] transition-colors hover:bg-[var(--color-card)] lg:hidden"
            >
              <span className="sr-only">Menu</span>
              <span className="flex w-5 flex-col gap-[6px]">
                <span className={"h-px w-full bg-[var(--color-text)] transition-transform " + (menuOpen ? "translate-y-[3.5px] rotate-45" : "")} />
                <span className={"h-px w-3/4 self-end bg-[var(--color-text)] transition-transform " + (menuOpen ? "-translate-y-[3.5px] -rotate-45 w-full" : "")} />
              </span>
            </button>
          </div>

          {menuOpen && (
            <nav id="mobile-navigation" aria-label="Navigasi ponsel" className="border-t border-[var(--color-border)] bg-[var(--color-bg)] px-5 py-3 lg:hidden">
              <div className="container flex flex-col">
                {navigation.map(([label, href]) => (
                  <a key={href} href={href} onClick={closeMenu} className="border-b border-[var(--color-border)] py-4 text-base font-medium last:border-b-0">{label}</a>
                ))}
                <a href="#contact" onClick={closeMenu} className="mt-3 inline-flex min-h-12 items-center justify-center rounded-md bg-[var(--color-accent)] px-5 text-sm font-medium text-white">Konsultasikan Proyek</a>
              </div>
            </nav>
          )}
        </GlassPanel>
      </header>

      <Section id="home" ref={heroRef} padding="xl" background="default" className={`${heroVisible ? "reveal-up visible" : "reveal-up"} relative`}>
        <div className="grid gap-12 lg:grid-cols-[1.1fr_0.9fr] lg:gap-16 lg:items-end">
          <div className="relative">
            <div className="flex items-center gap-3 mb-8">
              <ArchNum className="text-2xl lg:text-3xl">01</ArchNum>
              <Caption accent className="self-end">Beranda</Caption>
            </div>
            <Heading level={1} display className="max-w-3xl text-[var(--color-text)] leading-[1.02]">
              Ruang yang<br />
              dirancang.<br />
              <span className="text-[var(--color-accent)]">Rumah yang diwujudkan.</span>
            </Heading>
            <Body size="md" muted lead className="mt-6 max-w-xl">
              Dari renovasi hingga pembangunan rumah, LineHouse menghadirkan solusi konstruksi dengan perhatian pada detail, kualitas, dan karakter setiap ruang.
            </Body>
            <div className="mt-10 flex flex-wrap gap-4">
              <Button variant="accent" size="lg" href="#contact">Diskusikan Proyek Anda</Button>
              <Button variant="secondary" size="lg" href="#projects">Jelajahi Proyek</Button>
            </div>
          </div>

          <div className="relative aspect-[4/5] lg:aspect-[5/4] overflow-hidden bg-[var(--color-surface)]">
            <Image
              src="https://images.unsplash.com/photo-1600607687920-4e2a09cf159d?auto=format&fit=crop&w=2200&q=90"
              alt="Arsitektur rumah modern dengan komposisi material natural dan bukaan lebar"
              fill
              priority
              sizes="(max-width: 1024px) 100vw, 50vw"
              className="object-cover object-center transition-transform duration-1000 group-hover:scale-[1.02]"
              style={{ position: "absolute", inset: 0 }}
            />
            <div className="absolute inset-0 bg-gradient-to-tr from-black/60 via-black/20 to-transparent" />
            <div className="absolute bottom-6 left-6 right-6 lg:bottom-8 lg:left-8 lg:right-8">
              <Caption className="text-white/80 tracking-wider">Proyek Unggulan</Caption>
              <Heading level={3} className="mt-2 text-white text-2xl lg:text-3xl font-semibold leading-tight">
                Rumah Modern Minimalis — Bandung
              </Heading>
              <Body size="sm" className="mt-2 text-white/70 max-w-xs">2024 · 180 m² · Arsitektur Hunian</Body>
            </div>
            <div className="absolute top-6 right-6 lg:top-8 lg:right-8 flex flex-col items-end gap-2">
              <ArchNum className="text-white text-4xl lg:text-5xl font-bold leading-none">01</ArchNum>
              <div className="w-px h-24 bg-white/20 hidden lg:block" />
            </div>
          </div>
        </div>

        <Caption className="mt-8 text-center text-[var(--color-text-muted)]">Foto ilustrasi arsitektur. Proyek asli LineHouse akan ditampilkan setelah dokumentasi selesai.</Caption>
      </Section>

      <Section id="services" ref={servicesRef} padding="xl" background="muted" className={`${servicesVisible ? "reveal-up visible" : "reveal-up"} border-y border-[var(--color-border)]`}>
        <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <div className="flex items-center gap-3">
              <ArchNum className="text-2xl lg:text-3xl">02</ArchNum>
              <Caption accent>Layanan</Caption>
            </div>
            <Heading level={2} display className="mt-4">
              Dari rencana<br />
              menjadi nyata.
            </Heading>
          </div>
          <Body size="md" muted lead className="max-w-md">
            Setiap rumah punya kebutuhan berbeda. Kami membantu menemukan pendekatan yang sesuai dengan ruang dan tujuan Anda.
          </Body>
        </div>

        <div className="mt-12 grid gap-6 sm:mt-16 sm:gap-8 lg:grid-cols-2 lg:gap-10">
          {services.map((service, index) => (
            <Card
              ref={serviceRefs[index]}
              variant="elevated"
              hover
              key={service.number}
              className={`${serviceVisibilities[index] ? "reveal-up visible" : "reveal-up"}`}
            >
              <div className="flex flex-col h-full">
                <div className="flex items-baseline gap-3 mb-4">
                  <ArchNum className="text-3xl lg:text-4xl">{service.number}</ArchNum>
                  <Caption accent className="self-end">{service.title}</Caption>
                </div>
                <Heading level={3} className="text-xl lg:text-2xl">{service.title}</Heading>
                <Body size="sm" muted className="mt-4 flex-1">{service.description}</Body>
              </div>
            </Card>
          ))}
        </div>

        <div className="mt-16 text-center">
          <Caption accent className="mb-4">Siap memulai?</Caption>
          <Heading level={2} display className="mb-6 max-w-xl mx-auto">Mari wujudkan ruang impian Anda.</Heading>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button variant="accent" size="lg" href="/contact">Konsultasikan Proyek</Button>
            <Button variant="secondary" size="lg" href="/projects">Jelajahi Proyek</Button>
          </div>
        </div>
      </Section>

      <Section id="projects" ref={projectsRef} padding="xl" background="default" className={`${projectsVisible ? "reveal-up visible" : "reveal-up"}`}>
        <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <div className="flex items-center gap-3">
              <ArchNum className="text-2xl lg:text-3xl">03</ArchNum>
              <Caption accent>Proyek</Caption>
            </div>
            <Heading level={2} display>Ruang yang menginspirasi.</Heading>
          </div>
          <Body size="md" muted lead className="max-w-md">
            Referensi visual untuk membantu membayangkan karakter ruang yang bisa dikembangkan bersama LineHouse.
          </Body>
        </div>

        <div className="mt-12 grid gap-8 sm:mt-16 sm:gap-10 lg:mt-20 lg:grid-cols-12">
          {projects.map((item, index) => (
            <Card
              ref={projectRefs[index]}
              variant="project"
              hover
              key={item.number}
              className={`${item.shape} ${projectVisibilities[index] ? "reveal-up visible" : "reveal-up"}`}
            >
              <div className="relative aspect-[4/3] overflow-hidden bg-[var(--color-surface)]">
                <Image
                  src={item.image}
                  alt={item.alt}
                  fill
                  loading={index === 0 ? "eager" : "lazy"}
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                  className="object-cover transition-transform duration-1000 hover:scale-[1.025]"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/10 to-transparent" />
              </div>
              <CardContent className="p-6 lg:p-8">
                <div className="flex items-center justify-between mb-4">
                  <Caption className="text-[var(--color-text-muted)] uppercase tracking-wider text-xs">{item.type}</Caption>
                  <ArchNum className="text-[var(--color-stone)]">{item.number}</ArchNum>
                </div>
                <Heading level={3} className="text-xl lg:text-2xl">{item.title}</Heading>
              </CardContent>
            </Card>
          ))}
        </div>
        <Caption className="mt-10 pt-6 border-t border-[var(--color-border)] text-center">
          Gambar di bagian ini adalah referensi visual, bukan klaim dokumentasi proyek LineHouse.
        </Caption>
      </Section>

      <Section id="about" ref={aboutRef} padding="xl" background="surface" className={`${aboutVisible ? "reveal-up visible" : "reveal-up"}`}>
        <div className="grid gap-12 lg:grid-cols-[1.2fr_0.8fr] lg:gap-24">
          <div>
            <div className="flex items-center gap-3">
              <ArchNum className="text-2xl lg:text-3xl">04</ArchNum>
              <Caption accent>Tentang</Caption>
            </div>
            <Heading level={2} display className="mt-5">
              Rumah bukan<br />
              hanya bentuk.<br />
              <span className="text-[var(--color-accent)]">Tapi juga rasa.</span>
            </Heading>
          </div>
          <div className="self-end">
            <Body size="md" muted lead>
              Kami percaya rumah yang baik bukan sekadar terlihat indah. Rumah juga perlu nyaman digunakan, sesuai kebutuhan, dan terasa seperti milik penghuninya. Itulah prinsip yang ingin dibawa LineHouse ke setiap proses.
            </Body>
            <div className="mt-10 grid grid-cols-2 gap-6 border-t border-[var(--color-border)] pt-6">
              <div>
                <Heading level={3} className="text-xl lg:text-2xl">Terarah</Heading>
                <Body size="sm" muted className="mt-2">Proses dan kebutuhan dibahas dengan jelas.</Body>
              </div>
              <div>
                <Heading level={3} className="text-xl lg:text-2xl">Bermakna</Heading>
                <Body size="sm" muted className="mt-2">Ruang mengikuti cara Anda hidup.</Body>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-16 lg:mt-24 grid gap-12 lg:grid-cols-2">
          <div className="relative aspect-[4/3] overflow-hidden bg-[var(--color-bg-secondary)]">
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
              <div className="flex items-center gap-4 p-4 rounded-lg border border-[var(--color-border)] bg-[var(--color-card)] hover:border-[var(--color-accent)] transition-colors">
                <ArchNum className="text-[var(--color-accent)]">B</ArchNum>
                <Body size="sm" className="leading-6">Bangun rumah — pembangunan baru dari perencanaan hingga selesai.</Body>
              </div>
              <div className="flex items-center gap-4 p-4 rounded-lg border border-[var(--color-border)] bg-[var(--color-card)] hover:border-[var(--color-accent)] transition-colors">
                <ArchNum className="text-[var(--color-accent)]">R</ArchNum>
                <Body size="sm" className="leading-6">Renovasi rumah — menyegarkan ruang dan memperbaiki fungsi.</Body>
              </div>
              <div className="flex items-center gap-4 p-4 rounded-lg border border-[var(--color-border)] bg-[var(--color-card)] hover:border-[var(--color-accent)] transition-colors">
                <ArchNum className="text-[var(--color-accent)]">K</ArchNum>
                <Body size="sm" className="leading-6">Rekonstruksi — menata ulang bangunan untuk kebutuhan jangka panjang.</Body>
              </div>
              <div className="flex items-center gap-4 p-4 rounded-lg border border-[var(--color-border)] bg-[var(--color-card)] hover:border-[var(--color-accent)] transition-colors">
                <ArchNum className="text-[var(--color-accent)]">IE</ArchNum>
                <Body size="sm" className="leading-6">Interior & eksterior — menyelaraskan dalam dan luar rumah.</Body>
              </div>
            </div>
          </div>
        </div>
      </Section>

      <Section id="process" ref={processRef} padding="xl" background="muted" className={`${processVisible ? "reveal-up visible" : "reveal-up"} border-y border-[var(--color-border)]`}>
        <div className="grid gap-12 lg:grid-cols-[0.7fr_1.3fr] lg:gap-20">
          <div>
            <div className="flex items-center gap-3">
              <ArchNum className="text-2xl lg:text-3xl">05</ArchNum>
              <Caption accent>Alur Kerja</Caption>
            </div>
            <Heading level={2} display className="mt-4">Jelas di setiap langkah.</Heading>
            <Body size="md" muted lead className="mt-4 max-w-sm">
              Komunikasi yang baik membantu proses pembangunan berjalan lebih terarah sejak awal.
            </Body>
          </div>

          <div className="grid sm:grid-cols-2 gap-6">
            {steps.map((step, index) => (
              <Card
                ref={stepRefs[index]}
                variant="bordered"
                hover
                key={step.number}
                className={`${stepVisibilities[index] ? "reveal-up visible" : "reveal-up"} p-6 lg:p-8 ${index % 2 === 1 ? "lg:pl-10" : "lg:pr-10"}`}
              >
                <div className="flex items-baseline gap-3 mb-4">
                  <ArchNum className="text-3xl lg:text-4xl">{step.number}</ArchNum>
                  <Caption accent className="self-end">{step.title}</Caption>
                </div>
                <Heading level={3} className="text-xl lg:text-2xl">{step.title}</Heading>
                <Body size="sm" muted className="mt-4">{step.text}</Body>
              </Card>
            ))}
          </div>
        </div>
      </Section>

      <Section id="contact" ref={contactRef} padding="xl" background="default" className={`${contactVisible ? "reveal-up visible" : "reveal-up"}`}>
        <div className="grid gap-12 lg:grid-cols-[1.2fr_0.8fr] lg:items-end lg:gap-20">
          <div>
            <div className="flex items-center gap-3">
              <ArchNum className="text-2xl lg:text-3xl">06</ArchNum>
              <Caption accent className="text-[var(--color-accent-light)]">Mulai Proyek</Caption>
            </div>
            <Heading level={2} display className="mt-5 max-w-3xl text-[var(--color-text)]">
              Mari wujudkan<br />
              ruang impianmu.
            </Heading>
            <Body size="md" muted className="mt-5 max-w-xl text-[var(--color-text)]/65 sm:text-base sm:leading-7">
              Ceritakan rencana rumah atau ruang yang ingin Anda bangun. Kita mulai dengan percakapan.
            </Body>
            <Button variant="accent" size="lg" href="https://wa.me/6283829677870" target="_blank" rel="noopener noreferrer" className="mt-8">
              Hubungi LineHouse via WhatsApp <span className="ml-2" aria-hidden="true">→</span>
            </Button>
          </div>

          <GlassPanel variant="elevated" className="p-6 lg:p-8">
            <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
              <div>
                <Caption className="text-[var(--color-text-muted)]">Wilayah layanan</Caption>
                <Body size="md" className="mt-2 text-[var(--color-text)]">Jawa Barat, Indonesia</Body>
              </div>
              <div>
                <Caption className="text-[var(--color-text-muted)]">Instagram</Caption>
                <a href="https://instagram.com/linehouse.id" target="_blank" rel="noopener noreferrer" className="mt-2 inline-block text-base text-[var(--color-text)] transition-colors hover:text-[var(--color-accent)]">@linehouse.id →</a>
              </div>
            </div>
          </GlassPanel>
        </div>
      </Section>

      <footer className="bg-[var(--color-footer)] px-5 pb-7 text-[var(--color-text)]/50 sm:px-7 lg:px-10 border-t border-[var(--color-border)]">
        <div className="container flex flex-col gap-4 border-t border-[var(--color-border)] pt-6 sm:flex-row sm:items-center sm:justify-between">
          <Image src="/images/linehouse-logo.svg" alt="LineHouse" width={120} height={40} className="h-7 w-auto brightness-0 invert" />
          <Caption>© 2026 LineHouse · Konstruksi & Renovasi</Caption>
        </div>
      </footer>
    </main>
  );
}