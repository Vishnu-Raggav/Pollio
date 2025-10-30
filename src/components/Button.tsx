import cn from "@/utils/cn";
import type React from "react";
import type { JSX } from "react";

type ButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement> & {
  text: string;
  variant: "primary" | "secondary";
  children?: JSX.Element;
};

export default function Button({
  text,
  variant,
  children,
  ...props
}: ButtonProps) {
  return (
    <button
      {...props}
      className={cn(
        "w-fit h-fit select-none cursor-pointer flex items-center gap-2 rounded-md px-3 max-md:px-2 py-1 border-[1px] font-satoshi-medium",
        variant === "primary"
          ? "bg-black border-black text-white"
          : "bg-white border-black/25 text-black"
      )}
    >
      {children}
      <span className="text-lg max-md:text-sm">{text}</span>
    </button>
  );
}
