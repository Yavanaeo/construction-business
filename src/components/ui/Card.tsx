import { type HTMLAttributes, type ReactNode, forwardRef } from "react";

export interface CardProps extends HTMLAttributes<HTMLDivElement> {
  children: ReactNode;
  variant?: "default" | "project" | "service" | "glass" | "elevated" | "bordered";
  hover?: boolean;
  className?: string;
  as?: "article" | "div" | "section";
}

export const Card = forwardRef<HTMLDivElement, CardProps>(
  (
    {
      children,
      variant = "default",
      hover = false,
      className = "",
      as: Component = "article",
      ...props
    },
    ref,
  ) => {
    const variantClasses = {
      default: "card-base",
      project: "card-base overflow-hidden",
      service: "card-base p-6 lg:p-8",
      glass: "glass-panel rounded-lg p-6 lg:p-8",
      elevated: "bg-[var(--color-surface)] border border-[var(--color-border)] rounded-lg",
      bordered: "bg-transparent border border-[var(--color-border-strong)] rounded-lg",
    };

    const hoverClass = hover ? "card-hover" : "";

    return (
      <Component
        ref={ref}
        className={`${variantClasses[variant]} ${hoverClass} ${className}`}
        {...props}
      >
        {children}
      </Component>
    );
  },
);

Card.displayName = "Card";

export interface CardContentProps extends HTMLAttributes<HTMLDivElement> {
  children: ReactNode;
  className?: string;
}

export function CardContent({ children, className = "", ...props }: CardContentProps) {
  return <div className={className} {...props}>{children}</div>;
}

export interface CardFooterProps extends HTMLAttributes<HTMLDivElement> {
  children: ReactNode;
  className?: string;
}

export function CardFooter({ children, className = "", ...props }: CardFooterProps) {
  return (
    <div className={`mt-6 pt-4 border-t border-[var(--color-border)] ${className}`} {...props}>
      {children}
    </div>
  );
}