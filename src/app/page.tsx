"use client";

import { useState } from "react";

const services = [
  { number: "01", title: "Renovasi Rumah", description: "Menyegarkan dan menata kembali ruang agar lebih nyaman, fungsional, dan sesuai kebutuhan." },
  { number: "02", title: "Bangun Rumah", description: "Mewujudkan rumah dari awal dengan proses yang terarah, transparan, dan memperhatikan detail." },
  { number: "03", title: "Rekonstruksi", description: "Menangani perubahan struktur dan ruang untuk menghidupkan kembali bangunan dengan fungsi yang lebih baik." },
  { number: "04", title: "Interior & Eksterior", description: "Menyempurnakan karakter rumah melalui detail interior dan tampilan luar yang selaras." },
];

const projects = [
  { number: "01", type: "Renovasi", title: "Private Residence", tone: "from-[#d8d1c7] via-[#b8afa3] to-[#91887e]" },
  { number: "02", type: "Bangun Rumah", title: "Modern Residence", tone: "from-[#ded8cf] via-[#c2b9ae] to-[#9c9287]" },
  { number: "03", type: "Interior", title: "Contemporary Interior", tone: "from-[#c9c2b8] via-[#a9a097] to-[#7f776f]" },
];

const process = [
  ["01", "Konsultasi", "Memahami kebutuhan, karakter lahan, ruang, dan tujuan proyek."],
  ["02", "Perencanaan", "Menyusun konsep, kebutuhan pekerjaan, dan arah pengerjaan."],
  ["03", "Pengerjaan", "Mewujudkan rencana dengan pengawasan proses dan detail pekerjaan."],
  ["04", "Serah Terima", "Memastikan hasil akhir siap digunakan dan sesuai kesepakatan."],
];

export default function Home() {
  const [menuOpen, setMenuOpen] = useState(false);
  const closeMenu = () => setMenuOpen(false);

  return (
    <main className="min-h-screen overflow-x-hidden bg-[#f6f4ef] text-[#292824]">
      <header className="sticky top-0 z-50 border-b border-[#292824]/10 bg-[#f6f4ef]/95 backdrop-blur-md">
        <div className="mx-auto flex h-[72px] max-w-[1320px] items-center justify-between px-5 sm:px-7 lg:h-20 lg:px-10">
          <a href="#home" onClick={closeMenu} aria-label="LineHouse">
            <img src="/images/linehouse-logo.png" alt="LineHouse" className="h-8 w-auto sm:h-9" />
          </a>

          <nav className="hidden items-center gap-7 lg:flex">
            <a href="#services" className="text-sm text-[#5f5b55] transition hover:text-[#292824]">Services</a>
            <a href="#projects" className="text-sm text-[#5f5b55] transition hover:text-[#292824]">Projects</a>
            <a href="#about" className="text-sm text-[#5f5b55] transition hover:text-[#292824]">About</a>
            <a href="#contact" className="text-sm text-[#5f5b55] transition hover:text-[#292824]">Contact</a>
          </nav>

          <a href="#contact" className="hidden rounded-full bg-[#292824] px-5 py-2.5 text-sm font-medium text-white transition hover:bg-[#4b4842] lg:inline-flex">
            Konsultasi
          </a>

          <button type="button" onClick={() => setMenuOpen((open) => !open)} aria-label={menuOpen ? "Tutup menu" : "Buka menu"} aria-expanded={menuOpen} className="flex h-10 w-10 items-center justify-center rounded-full border border-[#292824]/15 lg:hidden">
            <span className="sr-only">Menu</span>
            <span className="flex w-5 flex-col gap-1.5">
              <span className="h-px w-full bg-[#292824]" />
              <span className="h-px w-3/4 self-end bg-[#292824]" />
            </span>
          </button>
        </div>

        {menuOpen && (
          <div className="border-t border-[#292824]/10 bg-[#f6f4ef] px-5 py-5 lg:hidden">
            <nav className="mx-auto flex max-w-[1320px] flex-col">
              {[
                ["Services", "#services"],
                ["Projects", "#projects"],
                ["About", "#about"],
                ["Contact", "#contact"],
              ].map(([label, href]) => (
                <a key={href} href={href} onClick={closeMenu} className="border-b border-[#292824]/10 py-4 text-lg">
                  {label}
                </a>
              ))}
            </nav>
          </div>
        )}
      </header>

      <section id="home" className="scroll-mt-20">
        <div className="mx-auto max-w-[1320px] px-5 pb-16 pt-16 sm:px-7 sm:pt-20 md:pb-20 lg:px-10 lg:pb-28 lg:pt-24">
          <div className="grid gap-12 lg:grid-cols-[1.15fr_0.85fr] lg:items-end lg:gap-16">
            <div>
              <p className="mb-6 text-[11px] font-medium uppercase tracking-[0.24em] text-[#8b7664] sm:text-xs">LineHouse / Construction & Renovation</p>
              <h1 className="max-w-4xl text-[clamp(3.25rem,12vw,8.75rem)] font-medium leading-[0.9] tracking-[-0.065em]">
                Ruang yang
                <br />
                <span className="text-[#8b7664]">punya makna.</span>
              </h1>
            </div>

            <div className="max-w-xl lg:pb-2">
              <p className="text-[17px] leading-7 text-[#66615a] sm:text-lg sm:leading-8">
                LineHouse membantu membangun, merenovasi, dan menyempurnakan rumah dengan proses yang jelas serta perhatian pada setiap detail.
              </p>
              <div className="mt-7 flex flex-wrap items-center gap-3">
                <a href="#projects" className="rounded-full bg-[#292824] px-6 py-3.5 text-sm font-medium text-white transition hover:bg-[#4b4842]">Lihat proyek</a>
                <a href="#services" className="rounded-full border border-[#292824]/20 px-6 py-3.5 text-sm font-medium transition hover:bg-white">Layanan kami</a>
              </div>
            </div>
          </div>

          <div className="mt-12 sm:mt-16 lg:mt-20">
            <div className="relative min-h-[52vh] overflow-hidden rounded-[2px] bg-[#c8c1b7] sm:min-h-[58vh] lg:min-h-[70vh]">
              <div className="absolute inset-0 bg-gradient-to-br from-[#dcd6cd] via-[#b9b0a4] to-[#8e857b]" />
              <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_30%,rgba(255,255,255,0.25),transparent_35%)]" />
              <div className="absolute inset-x-5 bottom-5 flex items-end justify-between gap-5 text-white sm:inset-x-8 sm:bottom-8 lg:inset-x-10 lg:bottom-10">
                <div>
                  <p className="text-[10px] font-medium uppercase tracking-[0.24em] text-white/70 sm:text-xs">Featured work</p>
                  <p className="mt-2 text-xl font-medium tracking-tight sm:text-3xl lg:text-4xl">Rumah yang dirancang untuk hidup.</p>
                </div>
                <span className="hidden text-sm text-white/70 sm:block">LineHouse</span>
              </div>
            </div>
            <p className="mt-3 text-xs text-[#8b857d]">Area ini dapat menggunakan foto proyek asli LineHouse.</p>
          </div>
        </div>
      </section>

      <section id="services" className="scroll-mt-20 border-t border-[#292824]/10">
        <div className="mx-auto max-w-[1320px] px-5 py-20 sm:px-7 sm:py-24 lg:px-10 lg:py-32">
          <div className="grid gap-12 lg:grid-cols-[0.7fr_1.3fr] lg:gap-20">
            <div>
              <p className="text-[11px] font-medium uppercase tracking-[0.24em] text-[#8b7664] sm:text-xs">01 / Services</p>
              <h2 className="mt-4 text-4xl font-medium tracking-[-0.045em] sm:text-5xl lg:text-6xl">Apa yang<br />kami kerjakan.</h2>
              <p className="mt-6 max-w-sm text-[15px] leading-7 text-[#706b64] sm:text-base">Dari perubahan kecil sampai pembangunan menyeluruh, kami menyesuaikan pendekatan dengan kebutuhan setiap rumah.</p>
            </div>

            <div className="border-t border-[#292824]/15">
              {services.map((service) => (
                <article key={service.number} className="grid gap-3 border-b border-[#292824]/15 py-6 sm:grid-cols-[60px_1fr] sm:gap-6 sm:py-8">
                  <span className="text-xs font-medium text-[#9a7b65]">{service.number}</span>
                  <div>
                    <h3 className="text-xl font-medium tracking-[-0.02em] sm:text-2xl">{service.title}</h3>
                    <p className="mt-2 max-w-2xl text-[15px] leading-6 text-[#706b64] sm:text-base sm:leading-7">{service.description}</p>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section id="projects" className="scroll-mt-20 bg-[#eae6df]">
        <div className="mx-auto max-w-[1320px] px-5 py-20 sm:px-7 sm:py-24 lg:px-10 lg:py-32">
          <div className="flex flex-col gap-5 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <p className="text-[11px] font-medium uppercase tracking-[0.24em] text-[#8b7664] sm:text-xs">02 / Selected Projects</p>
              <h2 className="mt-4 text-4xl font-medium tracking-[-0.045em] sm:text-5xl lg:text-6xl">Beberapa karya.</h2>
            </div>
            <p className="max-w-md text-[15px] leading-7 text-[#706b64] sm:text-base">Tampilkan proyek terbaik LineHouse di sini. Foto dan detail proyek dapat ditambahkan tanpa mengubah struktur halaman.</p>
          </div>

          <div className="mt-12 grid gap-10 md:grid-cols-2 lg:mt-16 lg:grid-cols-12">
            {projects.map((project, index) => (
              <article key={project.number} className={index === 0 ? "md:col-span-2 lg:col-span-7" : index === 1 ? "lg:col-span-5 lg:pt-24" : "md:col-span-2 lg:col-span-6 lg:col-start-4 lg:pt-10"}>
                <div className="group overflow-hidden bg-[#c8c1b7]">
                  <div className={"aspect-[4/3] bg-gradient-to-br " + project.tone + " transition duration-700 group-hover:scale-[1.02]"} />
                </div>
                <div className="mt-4 flex items-start justify-between gap-5">
                  <div>
                    <p className="text-[10px] font-medium uppercase tracking-[0.2em] text-[#8b7664] sm:text-xs">{project.type}</p>
                    <h3 className="mt-1.5 text-xl font-medium tracking-[-0.02em] sm:text-2xl">{project.title}</h3>
                  </div>
                  <span className="text-xs text-[#8b857d]">{project.number}</span>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section id="about" className="scroll-mt-20">
        <div className="mx-auto max-w-[1320px] px-5 py-20 sm:px-7 sm:py-24 lg:px-10 lg:py-32">
          <div className="grid gap-12 lg:grid-cols-[1.25fr_0.75fr] lg:gap-24">
            <div>
              <p className="text-[11px] font-medium uppercase tracking-[0.24em] text-[#8b7664] sm:text-xs">03 / About LineHouse</p>
              <h2 className="mt-5 max-w-5xl text-[clamp(2.75rem,7vw,6.5rem)] font-medium leading-[0.94] tracking-[-0.06em]">Rumah bukan hanya<br />tentang bentuk.<br /><span className="text-[#8b7664]">Tapi tentang rasa.</span></h2>
            </div>

            <div className="self-end">
              <p className="text-[17px] leading-8 text-[#66615a] sm:text-lg">Kami percaya rumah yang baik terasa nyaman sebelum terlihat sempurna. Karena itu, LineHouse mengutamakan keseimbangan antara fungsi, kualitas pengerjaan, dan karakter pemiliknya.</p>
              <div className="mt-8 grid grid-cols-2 gap-6 border-t border-[#292824]/15 pt-6">
                <div><p className="text-2xl font-medium tracking-tight">01</p><p className="mt-1 text-sm text-[#706b64]">Jelas dalam proses</p></div>
                <div><p className="text-2xl font-medium tracking-tight">02</p><p className="mt-1 text-sm text-[#706b64]">Detail dalam hasil</p></div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="border-y border-[#292824]/10 bg-[#f0ede7]">
        <div className="mx-auto max-w-[1320px] px-5 py-20 sm:px-7 sm:py-24 lg:px-10 lg:py-28">
          <div className="grid gap-12 lg:grid-cols-[0.65fr_1.35fr] lg:gap-20">
            <div>
              <p className="text-[11px] font-medium uppercase tracking-[0.24em] text-[#8b7664] sm:text-xs">04 / Process</p>
              <h2 className="mt-4 text-4xl font-medium tracking-[-0.045em] sm:text-5xl">Sederhana.<br />Terarah.</h2>
            </div>

            <div className="grid gap-0 sm:grid-cols-2">
              {process.map(([number, title, description]) => (
                <div key={number} className="border-t border-[#292824]/15 py-6 sm:px-5 sm:py-7 sm:[&:nth-child(odd)]:pl-0 sm:[&:nth-child(even)]:border-l">
                  <span className="text-xs text-[#9a7b65]">{number}</span>
                  <h3 className="mt-4 text-xl font-medium">{title}</h3>
                  <p className="mt-2 text-sm leading-6 text-[#706b64]">{description}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section id="contact" className="scroll-mt-20 bg-[#292824] text-[#f6f4ef]">
        <div className="mx-auto max-w-[1320px] px-5 py-20 sm:px-7 sm:py-24 lg:px-10 lg:py-32">
          <div className="grid gap-12 lg:grid-cols-[1.25fr_0.75fr] lg:items-end lg:gap-20">
            <div>
              <p className="text-[11px] font-medium uppercase tracking-[0.24em] text-[#b9a18e] sm:text-xs">05 / Start a project</p>
              <h2 className="mt-5 max-w-4xl text-[clamp(3rem,7vw,6.5rem)] font-medium leading-[0.92] tracking-[-0.06em]">Punya rencana<br />untuk rumahmu?</h2>
              <a href="https://wa.me/6283829677870" target="_blank" rel="noopener noreferrer" className="mt-8 inline-flex rounded-full bg-[#f6f4ef] px-6 py-3.5 text-sm font-medium text-[#292824] transition hover:bg-[#b9a18e]">Konsultasi via WhatsApp →</a>
            </div>

            <div className="space-y-7 border-t border-white/15 pt-7 lg:border-t-0 lg:pt-0">
              <div><p className="text-[10px] uppercase tracking-[0.2em] text-white/45 sm:text-xs">Location</p><p className="mt-2 text-base text-white/85">Jawa Barat, Indonesia</p></div>
              <div><p className="text-[10px] uppercase tracking-[0.2em] text-white/45 sm:text-xs">Instagram</p><a href="https://instagram.com/linehouse.id" target="_blank" rel="noopener noreferrer" className="mt-2 block text-base text-white/85 hover:text-[#b9a18e]">@linehouse.id</a></div>
            </div>
          </div>
        </div>
      </section>

      <footer className="bg-[#292824] px-5 pb-8 text-white/45 sm:px-7 lg:px-10">
        <div className="mx-auto flex max-w-[1320px] flex-col gap-5 border-t border-white/10 pt-6 sm:flex-row sm:items-center sm:justify-between">
          <img src="/images/linehouse-logo.png" alt="LineHouse" className="h-7 w-auto brightness-0 invert" />
          <p className="text-xs">© {new Date().getFullYear()} LineHouse. Construction & Renovation.</p>
        </div>
      </footer>
    </main>
  );
}
