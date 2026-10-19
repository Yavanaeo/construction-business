import { Section } from "@/components/ui/Section";
import { Heading, Body } from "@/components/ui/Typography";
import { Button } from "@/components/ui/Button";
import { GlassPanel } from "@/components/ui/GlassPanel";

export const metadata = {
  title: "Kesalahan masuk · LineHouse",
};

export default async function AuthErrorPage({ searchParams }: { searchParams?: Promise<{ [key: string]: string | string[] | undefined }> }) {
  const sp = (await (searchParams ?? {})) as { error?: string } | undefined;
  const error = sp?.error;

  return (
    <main className="min-h-screen bg-[var(--color-bg)] text-[var(--color-text)] flex items-center justify-center">
      <Section>
        <GlassPanel variant="card" className="p-8 lg:p-12 max-w-md mx-auto text-center">
          <Heading level={1} display className="mb-4">Akses tidak valid</Heading>
          <Body size="md" muted className="mb-8 max-w-sm mx-auto">
            {error ? `Terjadi kesalahan: ${error}` : "Sesi Anda tidak valid atau telah kedaluwarsa."}
          </Body>
          <Button variant="primary" size="lg" className="w-full" href="/auth/signin">
            Kembali ke halaman masuk
          </Button>
        </GlassPanel>
      </Section>
    </main>
  );
}
