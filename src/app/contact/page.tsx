import { Section } from "@/components/ui/Section";
import { ContactForm } from "./ContactForm";

export const metadata = {
  title: "Kontak · LineHouse",
  description: "Hubungi LineHouse untuk konsultasi proyek konstruksi dan renovasi di Subang, Jawa Barat.",
};

export default function ContactPage() {
  return (
    <main className="min-h-screen bg-[var(--color-bg)] text-[var(--color-text)]">
      <Section id="contact" padding="xl" background="default">
        <ContactForm />
      </Section>
    </main>
  );
}
