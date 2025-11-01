import cn from "@/utils/cn";
import type React from "react";
import type { JSX } from "react";

type ButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement> & {
  text: string;
  size?: "medium" | "small";
  variant: "primary" | "secondary";
  children?: JSX.Element;
};

export default function Button({
  text,
  size,
  variant,
  children,
  ...props
}: ButtonProps) {
  return (
    <button
      {...props}
      className={cn(
        "w-fit h-fit select-none cursor-pointer flex items-center gap-2 rounded-md px-3 max-md:px-2 py-1 border-[1px] font-satoshi-medium",
        variant === "primary" && "bg-black border-black text-white",
        variant === "secondary" && "bg-white border-black/25 text-black",
        "disabled disabled:opacity-50 disabled:cursor-not-allowed disabled:text-neutral-400",
        size === "small" && "py-2 px-3 rounded-lg"
      )}
    >
      {children}
      <span
        className={cn(
          "text-lg max-md:text-sm",
          size === "small" && "text-base"
        )}
      >
        {text}
      </span>
    </button>
  );
}
