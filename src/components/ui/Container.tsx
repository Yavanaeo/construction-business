import { type HTMLAttributes, type ReactNode } from "react";

export interface ContainerProps extends HTMLAttributes<HTMLDivElement> {
  children: ReactNode;
  size?: "sm" | "md" | "lg" | "xl" | "full";
}

export function Container({
  children,
  size = "lg",
  className = "",
  ...props
}: ContainerProps) {
  const sizeClasses = {
    sm: "max-w-3xl",
    md: "max-w-5xl",
    lg: "max-w-7xl",
    xl: "max-w-[82.5rem]",
    full: "max-w-full",
  };

  return (
    <div
      className={`mx-auto w-full px-[var(--container-padding)] lg:px-[var(--container-padding-lg)] ${sizeClasses[size]} ${className}`}
      {...props}
    >
      {children}
    </div>
  );
}