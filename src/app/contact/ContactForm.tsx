"use client";

import { useState } from "react";
import { Heading, Body, Caption, Label } from "@/components/ui/Typography";
import { Button } from "@/components/ui/Button";
import { GlassPanel } from "@/components/ui/GlassPanel";
import { createContactSubmission } from "@/lib/actions/public";

const projectTypes = [
  "Bangun Rumah",
  "Renovasi Rumah",
  "Rekonstruksi",
  "Interior",
  "Eksterior",
  "Kombinasi",
] as const;

export function ContactForm() {
  const [status, setStatus] = useState<"idle" | "submitting" | "success" | "error">("idle");
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (formData: FormData) => {
    setStatus("submitting");
    setError(null);
    try {
      await createContactSubmission({
        name: formData.get("name") as string,
        email: formData.get("email") as string,
        phone: (formData.get("phone") as string) || undefined,
        project_type: (formData.get("project_type") as string) || undefined,
        message: formData.get("message") as string,
      });
      setStatus("success");
    } catch {
      setStatus("error");
      setError("Gagal mengirim pesan. Silakan coba lagi atau hubungi kami langsung via WhatsApp.");
    }
  };

  const info = (
    <div className="mt-12 grid sm:grid-cols-2 gap-6 border-t border-[var(--color-border)] border-opacity-10 pt-8 sm:pt-10">
      <div>
        <Caption className="text-[var(--color-muted-taupe)] uppercase tracking-wider font-semibold text-xs mb-2 block">
          WhatsApp
        </Caption>
        <a href="https://wa.me/6283829677870" target="_blank" rel="noopener noreferrer" className="text-base font-medium text-[var(--color-text)] hover:text-[var(--color-accent)] transition-colors">
          +62 838-2967-7870
        </a>
      </div>
      <div>
        <Caption className="text-[var(--color-muted-taupe)] uppercase tracking-wider font-semibold text-xs mb-2 block">
          Instagram
        </Caption>
        <a href="https://instagram.com/linehouse.id" target="_blank" rel="noopener noreferrer" className="text-base font-medium text-[var(--color-text)] hover:text-[var(--color-accent)] transition-colors">
          @linehouse.id
        </a>
      </div>
      <div className="sm:col-span-2">
        <Caption className="text-[var(--color-muted-taupe)] uppercase tracking-wider font-semibold text-xs mb-2 block">
          Wilayah layanan
        </Caption>
        <Body size="sm" className="text-[var(--color-text)]">Subang & seluruh Jawa Barat, Indonesia.</Body>
      </div>
    </div>
  );

  if (status === "success") {
    return (
      <>
        <div className="mb-8">
          <Caption accent>Mulai proyek</Caption>
          <Heading level={1} display className="mt-4 max-w-4xl">
            Mari wujudkan<br />
            ruang impian Anda.
          </Heading>
          <Body size="md" muted lead className="mt-6 max-w-xl">
            Ceritakan rencana rumah atau ruang yang ingin Anda bangun. Kami mulai dengan percakapan, tanpa komitmen awal.
          </Body>
        </div>
        <GlassPanel variant="card" className="p-8 lg:p-12 max-w-md mx-auto text-center">
          <div className="flex h-12 w-12 items-center justify-center rounded-full bg-[var(--color-accent)]/10 text-[var(--color-accent)] font-bold mx-auto mb-6">
            ✓
          </div>
          <Heading level={2} display className="mb-4">Pesan terkirim.</Heading>
          <Body size="md" muted className="mb-8 max-w-sm mx-auto">
            Terima kasih telah menghubungi LineHouse. Kami akan segera menanggapi pertanyaan Anda.
          </Body>
          <Button variant="primary" size="lg" onClick={() => setStatus("idle")}>
            Kirim pesan lain
          </Button>
        </GlassPanel>
      </>
    );
  }

  return (
    <>
      <div className="mb-8">
        <Caption accent>Mulai proyek</Caption>
        <Heading level={1} display className="mt-4 max-w-4xl">
          Mari wujudkan<br />
          ruang impian Anda.
        </Heading>
        <Body size="md" muted lead className="mt-6 max-w-xl">
          Ceritakan rencana rumah atau ruang yang ingin Anda bangun. Kami mulai dengan percakapan, tanpa komitmen awal.
        </Body>
      </div>

      <GlassPanel variant="card" className="p-6 lg:p-8">
        <form action={handleSubmit} className="space-y-5" onSubmit={(e) => { e.preventDefault(); handleSubmit(new FormData(e.currentTarget)); }}>
          <div className="grid sm:grid-cols-2 gap-5">
            <div className="space-y-2">
              <Label required>Nama lengkap</Label>
              <input
                name="name"
                type="text"
                required
                className="flex h-11 w-full rounded-lg border border-[var(--color-border)] border-opacity-20 bg-[var(--color-card)] px-4 py-3 text-[var(--color-text)] placeholder-[var(--color-muted)] focus:outline-none focus:ring-2 focus:ring-[var(--color-accent)] transition-all"
                placeholder="Nama Anda"
              />
            </div>
            <div className="space-y-2">
              <Label required>Email</Label>
              <input
                name="email"
                type="email"
                required
                className="flex h-11 w-full rounded-lg border border-[var(--color-border)] border-opacity-20 bg-[var(--color-card)] px-4 py-3 text-[var(--color-text)] placeholder-[var(--color-muted)] focus:outline-none focus:ring-2 focus:ring-[var(--color-accent)] transition-all"
                placeholder="email@example.com"
              />
            </div>
          </div>
          <div className="space-y-2">
            <Label>Nomor telepon (opsional)</Label>
            <input
              name="phone"
              type="tel"
              className="flex h-11 w-full rounded-lg border border-[var(--color-border)] border-opacity-20 bg-[var(--color-card)] px-4 py-3 text-[var(--color-text)] placeholder-[var(--color-muted)] focus:outline-none focus:ring-2 focus:ring-[var(--color-accent)] transition-all"
              placeholder="+62 8xx xxx xxxx"
            />
          </div>
          <div className="space-y-2">
            <Label>Tipe proyek</Label>
            <select
              name="project_type"
              className="flex h-11 w-full rounded-lg border border-[var(--color-border)] border-opacity-20 bg-[var(--color-card)] px-4 py-3 text-[var(--color-text)] focus:outline-none focus:ring-2 focus:ring-[var(--color-accent)] transition-all"
            >
              <option value="">Pilih tipe proyek</option>
              {projectTypes.map((t) => (
                <option key={t} value={t}>{t}</option>
              ))}
            </select>
          </div>
          <div className="space-y-2">
            <Label required>Pesan Anda</Label>
            <textarea
              name="message"
              rows={5}
              required
              className="flex h-32 w-full rounded-lg border border-[var(--color-border)] border-opacity-20 bg-[var(--color-card)] px-4 py-3 text-[var(--color-text)] placeholder-[var(--color-muted)] focus:outline-none focus:ring-2 focus:ring-[var(--color-accent)] transition-all"
              placeholder="Ceritakan rencana rumah atau ruang yang ingin Anda bangun..."
            />
          </div>
          {error && (
            <div className="rounded-lg bg-red/5 p-4 text-sm text-red border border-red/20">
              {error}
            </div>
          )}
          <Button variant="primary" size="lg" className="w-full" disabled={status === "submitting"}>
            {status === "submitting" ? "Mengirim..." : "Kirim pesan"}
          </Button>
          <p className="text-xs text-[var(--color-muted)] text-center">
            Data Anda digunakan hanya untuk keperluan konsultasi proyek.
          </p>
        </form>
      </GlassPanel>

      {info}
    </>
  );
}
