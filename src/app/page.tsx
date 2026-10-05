"use client";

import { useState } from "react";

const services = [
  ["01", "Renovasi Rumah"],
  ["02", "Bangun Rumah"],
  ["03", "Rekonstruksi"],
  ["04", "Interior & Eksterior"],
];

const projects = [
  {
    number: "01",
    category: "RESIDENTIAL / RENOVATION",
    title: "Private Residence",
  },
  {
    number: "02",
    category: "RESIDENTIAL / CONSTRUCTION",
    title: "Modern Residence",
  },
  {
    number: "03",
    category: "INTERIOR",
    title: "Contemporary Interior",
  },
];

export default function Home() {
  const [menuOpen, setMenuOpen] = useState(false);

  const go = (id: string) => {
    setMenuOpen(false);
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <main className="min-h-screen bg-[#f4f2ed] text-[#24231f]">
      <header className="fixed left-0 top-0 z-50 w-full border-b border-black/10 bg-[#f4f2ed]/90 backdrop-blur-md">
        <div className="mx-auto flex h-20 max-w-[1440px] items-center justify-between px-5 md:px-8 lg:px-12">
          <button onClick={() => go("home")} aria-label="LineHouse">
            <img
              src="/images/linehouse-logo.png"
              alt="LineHouse"
              className="h-9 w-auto"
            />
          </button>

          <nav className="hidden items-center gap-8 md:flex">
            <button onClick={() => go("services")} className="text-sm hover:opacity-60">
              Services
            </button>
            <button onClick={() => go("projects")} className="text-sm hover:opacity-60">
              Projects
            </button>
            <button onClick={() => go("about")} className="text-sm hover:opacity-60">
              About
            </button>
            <button onClick={() => go("contact")} className="text-sm hover:opacity-60">
              Contact
            </button>
          </nav>

          <a
            href="/login"
            className="hidden rounded-full bg-[#24231f] px-5 py-2.5 text-sm text-white md:block"
          >
            Client Login
          </a>

          <button
            onClick={() => setMenuOpen(!menuOpen)}
            className="md:hidden"
            aria-label="Open menu"
          >
            <span className="block h-px w-6 bg-[#24231f]" />
            <span className="mt-1.5 block h-px w-6 bg-[#24231f]" />
          </button>
        </div>

        {menuOpen && (
          <div className="border-t border-black/10 bg-[#f4f2ed] px-5 py-6 md:hidden">
            <div className="flex flex-col gap-5 text-lg">
              <button onClick={() => go("services")} className="text-left">
                Services
              </button>
              <button onClick={() => go("projects")} className="text-left">
                Projects
              </button>
              <button onClick={() => go("about")} className="text-left">
                About
              </button>
              <button onClick={() => go("contact")} className="text-left">
                Contact
              </button>
              <a href="/login">Client Login →</a>
            </div>
          </div>
        )}
      </header>

      <section id="home" className="px-5 pb-20 pt-32 md:px-8 lg:px-12 lg:pb-28 lg:pt-40">
        <div className="mx-auto max-w-[1440px]">
          <div className="max-w-[1100px]">
            <p className="mb-8 text-xs uppercase tracking-[0.28em] text-[#8b7664]">
              LineHouse / Construction & Renovation
            </p>

            <h1 className="text-[15vw] font-medium leading-[0.82] tracking-[-0.075em] md:text-[11vw] lg:text-[9.5vw]">
              Spaces
              <br />
              <span className="ml-[8vw]">with</span>
              <br />
              intention.
            </h1>

            <div className="mt-12 grid gap-8 md:grid-cols-[1fr_320px] md:items-end">
              <p className="max-w-xl text-lg leading-8 text-[#6f6b64] md:text-xl">
                Kami membangun dan merenovasi rumah dengan pendekatan yang
                sederhana, terukur, dan berorientasi pada kualitas.
              </p>

              <button
                onClick={() => go("projects")}
                className="group flex items-center gap-4 text-sm"
              >
                <span className="flex h-12 w-12 items-center justify-center rounded-full border border-black/20 transition group-hover:bg-[#24231f] group-hover:text-white">
                  ↓
                </span>
                Explore our work
              </button>
            </div>
          </div>

          <div className="mt-16 overflow-hidden bg-[#d8d3ca]">
            <div className="flex min-h-[55vh] items-end bg-[linear-gradient(135deg,#d7d1c8,#a8a095)] p-6 md:p-10 lg:min-h-[68vh]">
              <div className="flex w-full items-end justify-between gap-6 text-white">
                <div>
                  <p className="text-xs uppercase tracking-[0.25em] text-white/70">
                    Featured Project
                  </p>
                  <p className="mt-3 text-3xl font-medium tracking-tight md:text-5xl">
                    Your next space.
                  </p>
                </div>
                <p className="hidden max-w-xs text-right text-sm leading-6 text-white/70 md:block">
                  Foto proyek LineHouse dapat ditempatkan di area ini.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section id="services" className="border-t border-black/10 px-5 py-24 md:px-8 lg:px-12 lg:py-32">
        <div className="mx-auto max-w-[1440px]">
          <div className="grid gap-10 lg:grid-cols-[1fr_2fr]">
            <div>
              <p className="text-xs uppercase tracking-[0.28em] text-[#8b7664]">
                01 / Services
              </p>
              <h2 className="mt-5 text-4xl font-medium tracking-[-0.04em] md:text-6xl">
                What we do.
              </h2>
            </div>

            <div className="border-t border-black/15">
              {services.map(([number, title]) => (
                <div
                  key={number}
                  className="group grid grid-cols-[55px_1fr_auto] items-center border-b border-black/15 py-6 md:grid-cols-[80px_1fr_auto] md:py-8"
                >
                  <span className="text-sm text-[#8b7664]">{number}</span>
                  <span className="text-xl font-medium md:text-3xl">
                    {title}
                  </span>
                  <span className="text-xl transition-transform group-hover:translate-x-2">
                    ↗
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section id="projects" className="bg-[#e8e4dc] px-5 py-24 md:px-8 lg:px-12 lg:py-32">
        <div className="mx-auto max-w-[1440px]">
          <div className="flex flex-col justify-between gap-8 md:flex-row md:items-end">
            <div>
              <p className="text-xs uppercase tracking-[0.28em] text-[#8b7664]">
                02 / Selected Projects
              </p>
              <h2 className="mt-5 text-4xl font-medium tracking-[-0.04em] md:text-6xl">
                Built for living.
              </h2>
            </div>
            <p className="max-w-md text-[#6f6b64]">
              Beberapa contoh pekerjaan LineHouse. Foto asli proyek dapat
              menggantikan placeholder ini kapan saja.
            </p>
          </div>

          <div className="mt-16 space-y-16">
            {projects.map((project, index) => (
              <article
                key={project.number}
                className={index === 1 ? "md:ml-[18%] md:max-w-[70%]" : ""}
              >
                <div className="group overflow-hidden bg-[#c9c3ba]">
                  <div
                    className={
                      "aspect-[16/9] transition duration-700 group-hover:scale-[1.02] " +
                      (index === 0
                        ? "bg-[linear-gradient(135deg,#c5bdb3,#948a80)]"
                        : index === 1
                          ? "bg-[linear-gradient(135deg,#d1cbc2,#aaa096)]"
                          : "bg-[linear-gradient(135deg,#b5aea4,#817a72)]")
                    }
                  />
                </div>

                <div className="mt-5 flex justify-between gap-6">
                  <div>
                    <p className="text-xs uppercase tracking-[0.18em] text-[#8b7664]">
                      {project.category}
                    </p>
                    <h3 className="mt-2 text-2xl font-medium">{project.title}</h3>
                  </div>
                  <span className="text-sm text-[#6f6b64]">
                    {project.number}
                  </span>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section id="about" className="px-5 py-24 md:px-8 lg:px-12 lg:py-36">
        <div className="mx-auto max-w-[1440px]">
          <p className="text-xs uppercase tracking-[0.28em] text-[#8b7664]">
            03 / About
          </p>

          <div className="mt-10 grid gap-12 lg:grid-cols-[1.4fr_1fr]">
            <h2 className="max-w-5xl text-5xl font-medium leading-[0.95] tracking-[-0.055em] md:text-7xl lg:text-[7vw]">
              Good architecture
              <br />
              starts with
              <br />
              <span className="text-[#8b7664]">good intention.</span>
            </h2>

            <div className="self-end">
              <p className="text-lg leading-8 text-[#6f6b64]">
                LineHouse hadir untuk membantu menciptakan rumah yang nyaman,
                fungsional, dan memiliki karakter. Dari ide awal hingga
                pengerjaan, kami menjaga proses tetap jelas dan terarah.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section id="contact" className="bg-[#24231f] px-5 py-24 text-[#f4f2ed] md:px-8 lg:px-12 lg:py-36">
        <div className="mx-auto max-w-[1440px]">
          <p className="text-xs uppercase tracking-[0.28em] text-[#b9a18e]">
            04 / Start a project
          </p>

          <div className="mt-10 grid gap-12 lg:grid-cols-[1.5fr_1fr]">
            <div>
              <h2 className="max-w-4xl text-5xl font-medium leading-[0.95] tracking-[-0.05em] md:text-7xl lg:text-[7vw]">
                Let&apos;s build
                <br />
                something
                <br />
                <span className="text-[#b9a18e]">meaningful.</span>
              </h2>

              <a
                href="https://wa.me/6283829677870"
                target="_blank"
                rel="noopener noreferrer"
                className="mt-10 inline-flex rounded-full bg-[#f4f2ed] px-7 py-4 text-sm font-medium text-[#24231f] transition hover:bg-[#b9a18e]"
              >
                Start a conversation →
              </a>
            </div>

            <div className="self-end space-y-8 text-[#bdb8b0]">
              <div>
                <p className="text-xs uppercase tracking-[0.2em] text-[#8f8981]">
                  Location
                </p>
                <p className="mt-2 text-lg text-[#f4f2ed]">
                  Jawa Barat, Indonesia
                </p>
              </div>

              <div>
                <p className="text-xs uppercase tracking-[0.2em] text-[#8f8981]">
                  Instagram
                </p>
                <a
                  href="https://instagram.com/linehouse.id"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-2 block text-lg text-[#f4f2ed] hover:text-[#b9a18e]"
                >
                  @linehouse.id
                </a>
              </div>

              <div>
                <p className="text-xs uppercase tracking-[0.2em] text-[#8f8981]">
                  Client Area
                </p>
                <a
                  href="/login"
                  className="mt-2 block text-lg text-[#f4f2ed] hover:text-[#b9a18e]"
                >
                  Login Dashboard →
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      <footer className="bg-[#24231f] px-5 pb-8 md:px-8 lg:px-12">
        <div className="mx-auto flex max-w-[1440px] flex-col gap-5 border-t border-white/10 pt-7 md:flex-row md:items-center md:justify-between">
          <img
            src="/images/linehouse-logo.png"
            alt="LineHouse"
            className="h-8 w-auto brightness-0 invert"
          />
          <p className="text-xs text-[#77736d]">
            © {new Date().getFullYear()} LineHouse. All rights reserved.
          </p>
        </div>
      </footer>
    </main>
  );
}
