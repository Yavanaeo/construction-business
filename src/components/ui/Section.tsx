import { type HTMLAttributes, type ReactNode, forwardRef } from "react";
import { Container } from "./Container";

export interface SectionProps extends HTMLAttributes<HTMLElement> {
  children: ReactNode;
  id?: string;
  className?: string;
  padding?: "none" | "sm" | "md" | "lg" | "xl";
  background?: "default" | "muted" | "surface" | "elevated" | "gradient";
}

export const Section = forwardRef<HTMLElement, SectionProps>(
  (
    {
      children,
      id,
      className = "",
      padding = "lg",
      background = "default",
      ...props
    },
    ref,
  ) => {
    const paddingClasses = {
      none: "",
      sm: "py-12 lg:py-16",
      md: "py-16 lg:py-24",
      lg: "py-20 lg:py-32",
      xl: "py-24 lg:py-40",
    };

    const backgroundClasses = {
      default: "bg-[var(--color-bg)]",
      muted: "bg-[var(--color-bg-secondary)]",
      surface: "bg-[var(--color-surface)]",
      elevated: "bg-[var(--color-card)]",
      gradient: "bg-gradient-to-b from-[var(--color-bg)] to-[var(--color-bg-secondary)]",
    };

    return (
      <section
        ref={ref}
        id={id}
        className={`${paddingClasses[padding]} ${backgroundClasses[background]} ${className}`}
        {...props}
      >
        <Container size="xl">
          {children}
        </Container>
      </section>
    );
  },
);

Section.displayName = "Section";