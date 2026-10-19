import { type HTMLAttributes, type ReactNode } from "react";

export interface GlassPanelProps extends HTMLAttributes<HTMLDivElement> {
  children: ReactNode;
  variant?: "default" | "nav" | "card" | "overlay" | "elevated";
  className?: string;
  blur?: "sm" | "md" | "lg";
}

export function GlassPanel({
  children,
  variant = "default",
  className = "",
  blur = "md",
  ...props
}: GlassPanelProps) {
  const variantClasses = {
    default: "glass-panel",
    nav: "glass-nav",
    card: "glass-panel rounded-lg p-6 lg:p-8",
    overlay: "glass-panel rounded-lg p-4 lg:p-6",
    elevated: "bg-[var(--color-surface)/80] backdrop-blur-xl border border-[var(--color-border)] rounded-lg",
  };

  const blurClasses = {
    sm: "backdrop-blur-sm",
    md: "backdrop-blur-md",
    lg: "backdrop-blur-xl",
  };

  return (
    <div
      className={`${variantClasses[variant]} ${blurClasses[blur]} ${className}`}
      {...props}
    >
      {children}
    </div>
  );
}