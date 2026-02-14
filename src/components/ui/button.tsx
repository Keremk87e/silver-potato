import * as React from "react";
import { cn } from "@/lib/utils";

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "default" | "outline" | "ghost" | "destructive";
}

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant = "default", ...props }, ref) => (
    <button
      ref={ref}
      className={cn(
        "inline-flex items-center justify-center rounded-md px-4 py-2 text-sm font-medium transition",
        {
          "bg-slate-900 text-white hover:bg-slate-700": variant === "default",
          "border border-slate-300 bg-white hover:bg-slate-100": variant === "outline",
          "hover:bg-slate-100": variant === "ghost",
          "bg-red-600 text-white hover:bg-red-500": variant === "destructive"
        },
        className
      )}
      {...props}
    />
  )
);
Button.displayName = "Button";
