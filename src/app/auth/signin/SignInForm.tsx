"use client";

import { useState } from "react";
import { signIn } from "next-auth/react";
import { useRouter, usePathname } from "next/navigation";
import { Heading, Body, Label } from "@/components/ui/Typography";
import { Button } from "@/components/ui/Button";
import { GlassPanel } from "@/components/ui/GlassPanel";
import Image from "next/image";

export function SignInForm() {
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const pathname = usePathname();
  const callbackUrl = pathname.includes("/auth") ? "/" : pathname;

  const handleSubmit = async (formData: FormData) => {
    setLoading(true);
    setError(null);
    try {
      const result = await signIn("credentials", {
        email: formData.get("email"),
        password: formData.get("password"),
        callbackUrl,
        redirect: false,
      });
      if (result?.error) {
        setError("Email atau kata sandi salah.");
      } else {
        router.push(callbackUrl);
        router.refresh();
      }
    } catch {
      setError("Terjadi kesalahan. Silakan coba lagi.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <GlassPanel variant="card" className="p-8 lg:p-12 max-w-md mx-auto">
      <div className="text-center mb-10">
        <Image src="/images/linehouse-logo.svg" alt="LineHouse" width={120} height={40} className="h-8 w-auto mx-auto mb-6" />
        <Heading level={1} display className="mb-4">Masuk ke portal</Heading>
        <Body size="sm" muted className="max-w-sm mx-auto">
          Akses proyek dan kemajuan pembangunan Anda di sini.
        </Body>
      </div>

      {error && (
        <div className="mb-6 rounded-lg bg-red/5 p-4 text-sm text-red border border-red/20">
          {error}
        </div>
      )}

      <form action={handleSubmit} className="space-y-4" onSubmit={(e) => { e.preventDefault(); handleSubmit(new FormData(e.currentTarget)); }}>
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
        <div className="space-y-2">
          <Label required>Kata sandi</Label>
          <input
            name="password"
            type="password"
            required
            className="flex h-11 w-full rounded-lg border border-[var(--color-border)] border-opacity-20 bg-[var(--color-card)] px-4 py-3 text-[var(--color-text)] placeholder-[var(--color-muted)] focus:outline-none focus:ring-2 focus:ring-[var(--color-accent)] transition-all"
            placeholder="••••••••"
          />
        </div>
        <Button variant="primary" size="lg" className="w-full" disabled={loading}>
          {loading ? "Masuk..." : "Masuk"}
        </Button>
      </form>

      <p className="mt-8 text-center text-sm text-[var(--color-muted)]">
        Belum memiliki akses? Hubungi kami untuk mengajukan akun pelanggan.
      </p>
    </GlassPanel>
  );
}
