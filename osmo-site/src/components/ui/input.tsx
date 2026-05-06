import * as React from "react";
import { cn } from "@/lib/utils";

const Input = React.forwardRef<
  HTMLInputElement,
  React.InputHTMLAttributes<HTMLInputElement>
>(({ className, type, ...props }, ref) => {
  return (
    <input
      type={type}
      className={cn(
        "h-10 w-full border border-[#E0E0E0] bg-white px-3 py-2 text-sm text-[#111111] placeholder:text-[#999999] focus:outline-none focus:border-[#C8963E] focus:ring-1 focus:ring-[#C8963E] disabled:cursor-not-allowed disabled:opacity-50",
        className
      )}
      ref={ref}
      {...props}
    />
  );
});
Input.displayName = "Input";

export { Input };
