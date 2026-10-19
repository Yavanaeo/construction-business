import { Section } from "@/components/ui/Section";
import { SignInForm } from "./SignInForm";

export const metadata = {
  title: "Masuk · LineHouse",
  description: "Masuk ke portal pelanggan LineHouse.",
};

export default function SignInPage() {
  return (
    <main className="min-h-screen bg-[var(--color-bg)] text-[var(--color-text)] flex items-center justify-center">
      <Section>
        <SignInForm />
      </Section>
    </main>
  );
}
