import { cva, type VariantProps } from "class-variance-authority";
import type { ButtonHTMLAttributes } from "react";

const button = cva(
  "inline-flex items-center gap-2 font-semibold rounded-xl transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:outline-[var(--gold-500)] disabled:opacity-50",
  {
    variants: {
      variant: {
        primary: "bg-[var(--gold-500)] text-black hover:bg-[var(--gold-300)]",
        ghost: "text-[var(--ink-high)] hover:bg-white/5",
        outline: "border border-[var(--line-strong)] text-[var(--gold-500)] hover:bg-[var(--gold-500)]/10",
        danger: "bg-[var(--state-danger)] text-white",
      },
      size: { sm: "h-9 px-3 text-sm", md: "h-11 px-5 text-[15px]", lg: "h-12 px-6" },
    },
    defaultVariants: { variant: "primary", size: "md" },
  }
);

export interface ButtonProps
  extends ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof button> {}

export function Button({ variant, size, className, ...props }: ButtonProps) {
  return <button className={button({ variant, size, className })} {...props} />;
}
