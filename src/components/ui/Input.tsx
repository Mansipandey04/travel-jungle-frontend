import type { InputHTMLAttributes } from "react";

export function Input({
  className = "",
  ...props
}: InputHTMLAttributes<HTMLInputElement>) {
  return (
    <input
      className={`w-full border-0 border-b border-jungle/25 bg-transparent px-0 py-2.5 font-sans text-base text-jungle placeholder:text-jungle/40 focus:border-coral focus:outline-none ${className}`}
      {...props}
    />
  );
}
