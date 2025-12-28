import * as React from "react"
import { Slot } from "@radix-ui/react-slot"
import { cva } from "class-variance-authority"
import { cn } from "@/lib/utils"

const buttonVariants = cva(
  `
  inline-flex items-center justify-center gap-2 whitespace-nowrap
  rounded-lg text-sm font-medium
  transition-all duration-200 ease-out
  disabled:pointer-events-none disabled:opacity-50
  [&_svg]:pointer-events-none [&_svg:not([class*='size-'])]:size-4
  shrink-0 [&_svg]:shrink-0
  outline-none
  focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-offset-black
  `,
  {
    variants: {
      variant: {
        default: `
          bg-white text-black
          hover:bg-white/90
          active:scale-[0.98]
          focus-visible:ring-white/40
        `,

        primary: `
          bg-gradient-to-br from-emerald-400 to-teal-500
          text-black font-semibold
          hover:from-emerald-300 hover:to-teal-400
          active:scale-[0.97]
          focus-visible:ring-emerald-400/40
        `,

        secondary: `
          bg-zinc-900 text-white
          border border-zinc-800
          hover:bg-zinc-800
          active:scale-[0.98]
          focus-visible:ring-zinc-500/40
        `,

        outline: `
          border border-zinc-700
          text-zinc-200
          hover:bg-zinc-900
          active:scale-[0.98]
          focus-visible:ring-zinc-400/40
        `,

        ghost: `
          text-zinc-300
          hover:bg-zinc-900
          hover:text-white
          active:scale-[0.98]
        `,

        destructive: `
          bg-gradient-to-br from-red-500 to-rose-600
          text-white
          hover:from-red-400 hover:to-rose-500
          active:scale-[0.97]
          focus-visible:ring-red-500/40
        `,

        link: `
          text-emerald-400 underline-offset-4
          hover:underline hover:text-emerald-300
        `,
      },

      size: {
        default: "h-10 px-4",
        sm: "h-9 px-3 rounded-md text-xs",
        lg: "h-11 px-6 text-base",
        icon: "h-10 w-10",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
)

function Button({
  className,
  variant = "default",
  size = "default",
  asChild = false,
  ...props
}) {
  const Comp = asChild ? Slot : "button"

  return (
    <Comp
      data-slot="button"
      className={cn(buttonVariants({ variant, size }), className)}
      {...props}
    />
  )
}

export { Button, buttonVariants }
