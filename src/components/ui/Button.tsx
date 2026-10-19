"use client";

import { forwardRef, type ButtonHTMLAttributes, type AnchorHTMLAttributes, type ReactNode } from "react";

export interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "secondary" | "glass" | "ghost" | "accent";
  size?: "sm" | "md" | "lg";
  children: ReactNode;
  loading?: boolean;
  fullWidth?: boolean;
  href?: string;
  target?: string;
  rel?: string;
}

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      variant = "primary",
      size = "md",
      children,
      loading = false,
      fullWidth = false,
      className = "",
      disabled,
      href,
      target,
      rel,
      ...props
    },
    ref,
  ) => {
    const baseClasses = "btn-base inline-flex items-center justify-center gap-2 font-medium transition-all duration-250";

    const variantClasses = {
      primary: "btn-primary",
      secondary: "btn-secondary",
      glass: "btn-glass",
      ghost: "bg-transparent text-[var(--color-text)] hover:bg-[var(--color-border)] hover:bg-opacity-10",
      accent: "bg-[var(--color-accent)] text-white hover:bg-[var(--color-accent-light)] border border-[var(--color-accent)]",
    };

    const sizeClasses = {
      sm: "px-4 py-2 text-sm min-h-[2.5rem]",
      md: "px-6 py-3 text-sm min-h-[3rem]",
      lg: "px-8 py-4 text-base min-h-[3.5rem]",
    };

    const widthClass = fullWidth ? "w-full" : "";

    const isDisabled = disabled || loading;
    const isAnchor = !!href;

    const commonProps = {
      className: `${baseClasses} ${variantClasses[variant]} ${sizeClasses[size]} ${widthClass} ${className} ${isDisabled ? "opacity-50 cursor-not-allowed" : ""}`,
      disabled: isDisabled,
      'aria-busy': loading,
      ...props,
    };

    const renderLoading = () => (
      <svg
        className="animate-spin h-4 w-4"
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
        aria-hidden="true"
      >
        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="3" />
        <path
          className="opacity-75"
          fill="currentColor"
          d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
        />
      </svg>
    );

    if (isAnchor) {
      return (
        <a
          href={href}
          target={target}
          rel={rel}
          {...(commonProps as AnchorHTMLAttributes<HTMLAnchorElement>)}
          tabIndex={isDisabled ? -1 : 0}
          aria-disabled={isDisabled}
          onClick={(e) => { if (isDisabled) e.preventDefault(); }}
        >
          {loading && renderLoading()}
          <span>{children}</span>
        </a>
      );
    }

    return (
      <button
        ref={ref}
        {...commonProps}
      >
        {loading && renderLoading()}
        <span>{children}</span>
      </button>
    );
  },
);

Button.displayName = "Button";