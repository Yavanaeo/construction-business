"use client";

import { useState } from "react";

const services = [
  { number: "01", title: "Renovasi Rumah", description: "Menyegarkan ruang, memperbaiki fungsi, dan memberi kehidupan baru pada rumah yang sudah ada." },
  { number: "02", title: "Bangun Rumah", description: "Mewujudkan rumah dari perencanaan hingga pengerjaan dengan perhatian pada kualitas dan detail." },
  { number: "03", title: "Rekonstruksi", description: "Menata ulang bangunan agar lebih sesuai dengan kebutuhan, kenyamanan, dan rencana jangka panjang." },
  { number: "04", title: "Interior & Eksterior", description: "Menyelaraskan bagian dalam dan luar rumah agar terasa utuh, nyaman, dan memiliki karakter." },
];

const inspirations = [
  {
    number: "01",
    type: "Arsitektur hunian",
    title: "Sederhana, hangat, dan abadi",
    image: "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&w=1400&q=85",
    alt: "Inspirasi rumah modern dengan material natural dan bukaan lebar",
    shape: "lg:col-span-7",
  },
  {
    number: "02",
    type: "Ruang keluarga",
    title: "Ruang untuk merasa nyaman",
    image: "https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?auto=format&fit=crop&w=1200&q=85",
    alt: "Inspirasi interior ruang keluarga bernuansa hangat",
    shape: "lg:col-span-5 lg:mt-24",
  },
  {
    number: "03",
    type: "Detail interior",
    title: "Karakter hadir pada detail",
    image: "https://images.unsplash.com/photo-1600566753086-00f18fb6b3ea?auto=format&fit=crop&w=1400&q=85",
    alt: "Inspirasi detail interior rumah modern",
    shape: "lg:col-span-6 lg:col-start-4",
  },
];

const steps = [
  { number: "01", title: "Konsultasi", text: "Kami memahami kebutuhan, prioritas, dan gambaran ruang yang Anda inginkan." },
  { number: "02", title: "Perencanaan", text: "Ruang lingkup pekerjaan dan arah pengerjaan dibahas dengan jelas." },
  { number: "03", title: "Pengerjaan", text: "Pekerjaan dijalankan dengan perhatian pada detail dan komunikasi yang terarah." },
  { number: "04", title: "Serah terima", text: "Hasil pekerjaan ditinjau bersama sebelum proyek diselesaikan." },
];

export default function Home() {
  const [menuOpen, setMenuOpen] = useState(false);
  const closeMenu = () => setMenuOpen(false);

  const navigation = [
    ["Layanan", "#services"],
    ["Inspirasi", "#projects"],
    ["Tentang", "#about"],
    ["Kontak", "#contact"],
  ];

  return (
    <main className="min-h-screen overflow-x-clip bg-[#f6f4ef] text-[#292824]">
      <header className="sticky top-0 z-50 border-b border-[#292824]/10 bg-[#f6f4ef]/95 backdrop-blur-md">
        <div className="mx-auto flex h-[68px] max-w-[1320px] items-center justify-between px-5 sm:px-7 lg:h-20 lg:px-10">
          <a href="#home" onClick={closeMenu} aria-label="LineHouse — ke halaman utama" className="shrink-0">
            <img src="/images/linehouse-logo.png" alt="LineHouse" className="h-8 w-auto sm:h-9" />
          </a>

          <nav aria-label="Navigasi utama" className="hidden items-center gap-7 lg:flex">
            {navigation.map(([label, href]) => (
              <a key={href} href={href} className="text-sm text-[#625e57] transition-colors hover:text-[#292824]">{label}</a>
            ))}
          </nav>

          <a href="#contact" className="hidden rounded-full bg-[#292824] px-5 py-3 text-sm font-medium text-white transition-colors hover:bg-[#514d46] lg:inline-flex">
            Konsultasi proyek
          </a>

          <button
            type="button"
            onClick={() => setMenuOpen((open) => !open)}
            aria-label={menuOpen ? "Tutup menu" : "Buka menu"}
            aria-expanded={menuOpen}
            aria-controls="mobile-navigation"
            className="flex h-11 w-11 items-center justify-center rounded-full border border-[#292824]/20 transition-colors hover:bg-white lg:hidden"
          >
            <span className="sr-only">Menu</span>
            <span className="flex w-5 flex-col gap-[6px]">
              <span className={"h-px w-full bg-[#292824] transition-transform " + (menuOpen ? "translate-y-[3.5px] rotate-45" : "")} />
              <span className={"h-px w-3/4 self-end bg-[#292824] transition-transform " + (menuOpen ? "-translate-y-[3.5px] -rotate-45 w-full" : "")} />
            </span>
          </button>
        </div>

        {menuOpen && (
          <nav id="mobile-navigation" aria-label="Navigasi ponsel" className="border-t border-[#292824]/10 bg-[#f6f4ef] px-5 py-3 lg:hidden">
            <div className="mx-auto flex max-w-[1320px] flex-col">
              {navigation.map(([label, href]) => (
                <a key={href} href={href} onClick={closeMenu} className="border-b border-[#292824]/10 py-4 text-base font-medium last:border-b-0">{label}</a>
              ))}
              <a href="#contact" onClick={closeMenu} className="mt-3 inline-flex min-h-12 items-center justify-center rounded-full bg-[#292824] px-5 text-sm font-medium text-white">Konsultasi proyek</a>
            </div>
          </nav>
        )}
      </header>

      <section id="home" className="scroll-mt-20">
        <div className="mx-auto max-w-[1320px] px-5 pb-14 pt-14 sm:px-7 sm:pb-20 sm:pt-20 lg:px-10 lg:pb-24 lg:pt-24">
          <div className="grid gap-8 lg:grid-cols-[1.12fr_0.88fr] lg:items-end lg:gap-16">
            <div>
              <p className="mb-5 text-[11px] font-semibold uppercase tracking-[0.2em] text-[#8b7664] sm:mb-7 sm:text-xs sm:tracking-[0.24em]">
                LineHouse · Konstruksi & Renovasi
              </p>
              <h1 className="max-w-4xl text-[clamp(3.1rem,11.5vw,8.5rem)] font-medium leading-[0.91] tracking-[-0.065em]">
                Ruang yang
                <br />
                <span className="text-[#8b7664]">punya makna.</span>
              </h1>
            </div>

            <div className="max-w-xl lg:pb-2">
              <p className="text-base leading-7 text-[#625e57] sm:text-lg sm:leading-8">
                Membangun dan merenovasi rumah dengan perencanaan yang jelas,
                pengerjaan yang terarah, dan perhatian pada detail.
              </p>
              <div className="mt-6 flex flex-wrap gap-3 sm:mt-8">
                <a href="#contact" className="inline-flex min-h-12 items-center justify-center rounded-full bg-[#292824] px-6 text-sm font-medium text-white transition-colors hover:bg-[#514d46]">
                  Diskusikan proyek
                </a>
                <a href="#services" className="inline-flex min-h-12 items-center justify-center rounded-full border border-[#292824]/20 px-6 text-sm font-medium transition-colors hover:bg-white">
                  Kenali layanan
                </a>
              </div>
            </div>
          </div>

          <div className="mt-10 sm:mt-14 lg:mt-20">
            <div className="group relative h-[58vh] min-h-[360px] max-h-[760px] overflow-hidden bg-[#c9c1b5] sm:h-[62vh] sm:min-h-[440px] lg:h-[72vh]">
              <img
                src="https://images.unsplash.com/photo-1600607687920-4e2a09cf159d?auto=format&fit=crop&w=2200&q=90"
                alt="Inspirasi arsitektur rumah modern dengan komposisi material natural"
                fetchPriority="high"
                className="absolute inset-0 h-full w-full object-cover object-center transition-transform duration-700 group-hover:scale-[1.02]"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/55 via-black/5 to-black/10" />
              <div className="absolute inset-x-5 bottom-5 text-white sm:inset-x-8 sm:bottom-8 lg:inset-x-10 lg:bottom-10">
                <p className="text-[10px] font-semibold uppercase tracking-[0.22em] text-white/80 sm:text-xs">Ruang · Fungsi · Karakter</p>
                <p className="mt-2 max-w-2xl text-2xl font-medium leading-tight tracking-[-0.03em] sm:text-4xl lg:text-5xl">
                  Dirancang untuk kehidupan sehari-hari.
                </p>
              </div>
            </div>
            <p className="mt-3 text-xs leading-5 text-[#817b72]">
              Foto ilustrasi arsitektur. Akan lebih kuat jika diganti dengan proyek asli LineHouse.
            </p>
          </div>
        </div>
      </section>

      <section id="services" className="scroll-mt-20 border-t border-[#292824]/10">
        <div className="mx-auto max-w-[1320px] px-5 py-16 sm:px-7 sm:py-24 lg:px-10 lg:py-32">
          <div className="grid gap-9 lg:grid-cols-[0.72fr_1.28fr] lg:gap-20">
            <div>
              <p className="text-[11px] font-semibold uppercase tracking-[0.22em] text-[#8b7664] sm:text-xs">01 / Layanan</p>
              <h2 className="mt-4 text-4xl font-medium leading-[1.04] tracking-[-0.045em] sm:text-5xl lg:text-6xl">
                Dari rencana
                <br />
                menjadi nyata.
              </h2>
              <p className="mt-5 max-w-sm text-[15px] leading-7 text-[#625e57] sm:text-base sm:leading-7">
                Setiap rumah punya kebutuhan berbeda. Kami membantu menemukan pendekatan yang sesuai dengan ruang dan tujuan Anda.
              </p>
            </div>

            <div className="border-t border-[#292824]/15">
              {services.map((service) => (
                <article key={service.number} className="grid grid-cols-[34px_1fr] gap-3 border-b border-[#292824]/15 py-5 sm:grid-cols-[54px_1fr] sm:gap-5 sm:py-7">
                  <span className="pt-1 text-xs font-medium text-[#9a7b65]">{service.number}</span>
                  <div>
                    <h3 className="text-xl font-medium tracking-[-0.025em] sm:text-2xl">{service.title}</h3>
                    <p className="mt-2 max-w-2xl text-sm leading-6 text-[#625e57] sm:text-base sm:leading-7">{service.description}</p>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section id="projects" className="scroll-mt-20 bg-[#eae6df]">
        <div className="mx-auto max-w-[1320px] px-5 py-16 sm:px-7 sm:py-24 lg:px-10 lg:py-32">
          <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <p className="text-[11px] font-semibold uppercase tracking-[0.22em] text-[#8b7664] sm:text-xs">02 / Inspirasi</p>
              <h2 className="mt-4 text-4xl font-medium tracking-[-0.045em] sm:text-5xl lg:text-6xl">Ruang yang menginspirasi.</h2>
            </div>
            <p className="max-w-md text-sm leading-6 text-[#625e57] sm:text-base sm:leading-7">
              Referensi visual untuk membantu membayangkan karakter ruang yang bisa dikembangkan bersama LineHouse.
            </p>
          </div>

          <div className="mt-10 grid gap-9 sm:mt-14 sm:gap-12 lg:mt-16 lg:grid-cols-12">
            {inspirations.map((item) => (
              <article key={item.number} className={item.shape}>
                <div className="overflow-hidden bg-[#d0c8bd]">
                  <img
                    src={item.image}
                    alt={item.alt}
                    loading="lazy"
                    className="aspect-[4/3] w-full object-cover transition-transform duration-700 hover:scale-[1.025]"
                  />
                </div>
                <div className="mt-4 flex items-start justify-between gap-4 sm:mt-5">
                  <div>
                    <p className="text-[10px] font-semibold uppercase tracking-[0.18em] text-[#8b7664] sm:text-xs">{item.type}</p>
                    <h3 className="mt-1.5 text-lg font-medium tracking-[-0.02em] sm:text-2xl">{item.title}</h3>
                  </div>
                  <span className="pt-1 text-xs text-[#817b72]">{item.number}</span>
                </div>
              </article>
            ))}
          </div>
          <p className="mt-10 border-t border-[#292824]/10 pt-4 text-xs leading-5 text-[#817b72]">
            Gambar di bagian ini adalah referensi visual, bukan klaim dokumentasi proyek LineHouse.
          </p>
        </div>
      </section>

      <section id="about" className="scroll-mt-20">
        <div className="mx-auto max-w-[1320px] px-5 py-16 sm:px-7 sm:py-24 lg:px-10 lg:py-32">
          <div className="grid gap-9 lg:grid-cols-[1.2fr_0.8fr] lg:gap-24">
            <div>
              <p className="text-[11px] font-semibold uppercase tracking-[0.22em] text-[#8b7664] sm:text-xs">03 / Tentang LineHouse</p>
              <h2 className="mt-5 text-[clamp(2.65rem,7vw,6.4rem)] font-medium leading-[0.96] tracking-[-0.06em]">
                Rumah bukan
                <br />
                hanya bentuk.
                <br />
                <span className="text-[#8b7664]">Tapi juga rasa.</span>
              </h2>
            </div>
            <div className="self-end">
              <p className="text-base leading-7 text-[#625e57] sm:text-lg sm:leading-8">
                Kami percaya rumah yang baik bukan sekadar terlihat indah. Rumah juga perlu nyaman digunakan, sesuai kebutuhan, dan terasa seperti milik penghuninya. Itulah prinsip yang ingin dibawa LineHouse ke setiap proses.
              </p>
              <div className="mt-7 grid grid-cols-2 gap-5 border-t border-[#292824]/15 pt-5 sm:mt-9 sm:gap-7 sm:pt-6">
                <div>
                  <p className="text-xl font-medium sm:text-2xl">Terarah</p>
                  <p className="mt-1 text-sm leading-5 text-[#706b64]">Proses dan kebutuhan dibahas dengan jelas.</p>
                </div>
                <div>
                  <p className="text-xl font-medium sm:text-2xl">Bermakna</p>
                  <p className="mt-1 text-sm leading-5 text-[#706b64]">Ruang mengikuti cara Anda hidup.</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="border-y border-[#292824]/10 bg-[#f0ede7]">
        <div className="mx-auto max-w-[1320px] px-5 py-16 sm:px-7 sm:py-24 lg:px-10 lg:py-28">
          <div className="grid gap-9 lg:grid-cols-[0.7fr_1.3fr] lg:gap-20">
            <div>
              <p className="text-[11px] font-semibold uppercase tracking-[0.22em] text-[#8b7664] sm:text-xs">04 / Alur kerja</p>
              <h2 className="mt-4 text-4xl font-medium tracking-[-0.045em] sm:text-5xl">Jelas di setiap langkah.</h2>
              <p className="mt-4 max-w-sm text-sm leading-6 text-[#625e57] sm:text-base sm:leading-7">
                Komunikasi yang baik membantu proses pembangunan berjalan lebih terarah sejak awal.
              </p>
            </div>

            <div className="grid sm:grid-cols-2">
              {steps.map((step, index) => (
                <article key={step.number} className={"border-t border-[#292824]/15 py-5 sm:py-7 " + (index % 2 === 1 ? "sm:border-l sm:pl-6 lg:pl-8" : "sm:pr-6 lg:pr-8")}>
                  <span className="text-xs font-medium text-[#9a7b65]">{step.number}</span>
                  <h3 className="mt-3 text-lg font-medium sm:text-xl">{step.title}</h3>
                  <p className="mt-2 text-sm leading-6 text-[#625e57] sm:text-base">{step.text}</p>
                </article>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section id="contact" className="scroll-mt-20 bg-[#292824] text-[#f6f4ef]">
        <div className="mx-auto max-w-[1320px] px-5 py-16 sm:px-7 sm:py-24 lg:px-10 lg:py-32">
          <div className="grid gap-10 lg:grid-cols-[1.2fr_0.8fr] lg:items-end lg:gap-20">
            <div>
              <p className="text-[11px] font-semibold uppercase tracking-[0.22em] text-[#c4a991] sm:text-xs">05 / Mulai proyek</p>
              <h2 className="mt-5 max-w-4xl text-[clamp(2.8rem,7vw,6.3rem)] font-medium leading-[0.96] tracking-[-0.06em]">
                Mari wujudkan
                <br />
                ruang impianmu.
              </h2>
              <p className="mt-5 max-w-xl text-sm leading-6 text-white/65 sm:text-base sm:leading-7">
                Ceritakan rencana rumah atau ruang yang ingin Anda bangun. Kita mulai dengan percakapan.
              </p>
              <a href="https://wa.me/6283829677870" target="_blank" rel="noopener noreferrer" className="mt-7 inline-flex min-h-12 items-center justify-center rounded-full bg-[#f6f4ef] px-6 text-sm font-semibold text-[#292824] transition-colors hover:bg-[#c4a991]">
                Hubungi LineHouse via WhatsApp <span className="ml-2" aria-hidden="true">↗</span>
              </a>
            </div>

            <div className="grid grid-cols-1 gap-6 border-t border-white/15 pt-6 sm:grid-cols-2 lg:grid-cols-1 lg:gap-7 lg:border-t-0 lg:pt-0">
              <div>
                <p className="text-[10px] font-semibold uppercase tracking-[0.2em] text-white/45 sm:text-xs">Wilayah layanan</p>
                <p className="mt-2 text-base text-white/90">Jawa Barat, Indonesia</p>
              </div>
              <div>
                <p className="text-[10px] font-semibold uppercase tracking-[0.2em] text-white/45 sm:text-xs">Instagram</p>
                <a href="https://instagram.com/linehouse.id" target="_blank" rel="noopener noreferrer" className="mt-2 inline-block text-base text-white/90 transition-colors hover:text-[#c4a991]">@linehouse.id ↗</a>
              </div>
            </div>
          </div>
        </div>
      </section>

      <footer className="bg-[#292824] px-5 pb-7 text-white/50 sm:px-7 lg:px-10">
        <div className="mx-auto flex max-w-[1320px] flex-col gap-4 border-t border-white/10 pt-6 sm:flex-row sm:items-center sm:justify-between">
          <img src="/images/linehouse-logo.png" alt="LineHouse" className="h-7 w-auto brightness-0 invert" />
          <p className="text-xs leading-5">© {new Date().getFullYear()} LineHouse · Konstruksi & Renovasi</p>
        </div>
      </footer>
    </main>
  );
}
