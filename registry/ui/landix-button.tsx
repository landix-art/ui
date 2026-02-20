import * as React from "react"
import { motion, HTMLMotionProps } from "framer-motion"
import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

// Utility function inline for simplicity in portability
function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

interface LandixButtonProps extends HTMLMotionProps<"button"> {
  children: React.ReactNode
  variant?: "gold" | "glass"
}

const LandixButton = React.forwardRef<HTMLButtonElement, LandixButtonProps>(
  ({ className, children, variant = "gold", ...props }, ref) => {
    return (
      <motion.button
        ref={ref}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        className={cn(
          "relative overflow-hidden rounded-xl px-8 py-3 font-bold transition-all duration-300",
          // Gold Style
          variant === "gold" && [
            "bg-gradient-to-b from-yellow-300 via-amber-400 to-yellow-500",
            "text-amber-950",
            "border border-amber-200",
            "shadow-[0_0_20px_rgba(251,191,36,0.4)]",
            "hover:shadow-[0_0_30px_rgba(251,191,36,0.8)]"
          ],
          // Glass Style
          variant === "glass" && [
            "bg-white/10 backdrop-blur-lg border border-white/20",
            "text-white shadow-lg"
          ],
          className
        )}
        {...props}
      >
        <span className="relative z-10 flex items-center gap-2">{children}</span>
        {/* Shimmer Effect */}
        <div className="absolute inset-0 -translate-x-full group-hover:animate-[shimmer_2s_infinite] bg-gradient-to-r from-transparent via-white/50 to-transparent z-0" />
      </motion.button>
    )
  }
)
LandixButton.displayName = "LandixButton"

export { LandixButton }
