import type { ButtonHTMLAttributes, ReactNode } from "react";

type Variant = "primary" | "secondary" | "ghost";

const styles: Record<Variant, string> = {
  primary:
    "bg-coral text-sand hover:bg-coral/90 focus-visible:outline-coral",
  secondary:
    "bg-jungle text-sand hover:bg-jungle/90 focus-visible:outline-jungle",
  ghost:
    "bg-transparent text-jungle underline-offset-4 hover:underline focus-visible:outline-jungle",
};

export function Button({
  children,
  variant = "primary",
  className = "",
  ...props
}: ButtonHTMLAttributes<HTMLButtonElement> & {
  children: ReactNode;
  variant?: Variant;
}) {
  return (
    <button
      className={`inline-flex items-center justify-center px-5 py-2.5 font-sans text-sm tracking-wide transition focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 disabled:opacity-60 ${styles[variant]} ${className}`}
      {...props}
    >
      {children}
    </button>
  );
}
