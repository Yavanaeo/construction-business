import { type HTMLAttributes, type ReactNode, type ElementType } from "react";

export interface HeadingProps extends HTMLAttributes<HTMLHeadingElement> {
  children: ReactNode;
  level?: 1 | 2 | 3 | 4 | 5 | 6;
  className?: string;
  display?: boolean;
  accent?: boolean;
}

export function Heading({
  children,
  level = 2,
  className = "",
  display = false,
  accent = false,
  ...props
}: HeadingProps) {
  const Tag = `h${level}` as ElementType;

  const baseClasses = display ? "text-display" : "text-heading";

  const sizeClasses = {
    1: "text-[clamp(2.5rem,8vw,5rem)] lg:text-[clamp(3.5rem,10vw,7rem)]",
    2: "text-[clamp(2rem,6vw,4rem)] lg:text-[clamp(2.5rem,8vw,5.5rem)]",
    3: "text-[clamp(1.5rem,4vw,2.5rem)] lg:text-[clamp(2rem,5vw,3.5rem)]",
    4: "text-[clamp(1.25rem,3vw,2rem)] lg:text-[clamp(1.5rem,4vw,2.5rem)]",
    5: "text-[clamp(1.125rem,2.5vw,1.5rem)] lg:text-[clamp(1.25rem,3vw,2rem)]",
    6: "text-[clamp(1rem,2vw,1.25rem)] lg:text-[clamp(1.125rem,2.5vw,1.5rem)]",
  };

  const colorClass = accent ? "text-[var(--color-accent)]" : "";

  return (
    <Tag
      className={`${baseClasses} ${sizeClasses[level]} ${colorClass} ${className}`}
      {...props}
    >
      {children}
    </Tag>
  );
}

export interface BodyProps extends HTMLAttributes<HTMLParagraphElement> {
  children: ReactNode;
  size?: "sm" | "md" | "lg" | "xl";
  className?: string;
  muted?: boolean;
  lead?: boolean;
}

export function Body({
  children,
  size = "md",
  className = "",
  muted = false,
  lead = false,
  ...props
}: BodyProps) {
  const baseClasses = "text-body";

  const sizeClasses = {
    sm: "text-sm leading-7",
    md: "text-base leading-7 lg:leading-8",
    lg: "text-lg leading-8",
    xl: "text-xl leading-9",
  };

  const mutedClass = muted ? "text-[var(--color-text-muted)]" : "text-[var(--color-text)]";
  const leadClass = lead ? "max-w-2xl" : "";

  return (
    <p className={`${baseClasses} ${sizeClasses[size]} ${mutedClass} ${leadClass} ${className}`} {...props}>
      {children}
    </p>
  );
}

export interface CaptionProps extends HTMLAttributes<HTMLParagraphElement> {
  children: ReactNode;
  className?: string;
  accent?: boolean;
}

export function Caption({ children, className = "", accent = false, ...props }: CaptionProps) {
  return (
    <p
      className={`text-caption ${accent ? "text-[var(--color-accent)]" : "text-[var(--color-text-muted)]"} ${className}`}
      {...props}
    >
      {children}
    </p>
  );
}

export interface LabelProps extends HTMLAttributes<HTMLLabelElement> {
  children: ReactNode;
  className?: string;
  required?: boolean;
}

export function Label({ children, className = "", required = false, ...props }: LabelProps) {
  return (
    <label className={`text-caption text-[var(--color-text-muted)] ${className}`} {...props}>
      {children}
      {required && <span className="text-[var(--color-accent)] ml-1" aria-hidden="true">*</span>}
    </label>
  );
}

export interface ArchNumProps extends HTMLAttributes<HTMLSpanElement> {
  children: ReactNode;
  className?: string;
}

export function ArchNum({ children, className = "", ...props }: ArchNumProps) {
  return (
    <span className={`arch-num text-[var(--color-stone)] ${className}`} {...props}>
      {children}
    </span>
  );
}