import type { JSX } from "react";

interface ButtonProps {
  text: string;
  variant: "primary" | "secondary";
  children?: JSX.Element;
}

export default function Button({ text, variant, children }: ButtonProps) {
  return variant === "primary" ? (
    <div className="select-none flex items-center gap-2 cursor-pointer px-3 py-1 bg-black border-[1px] border-black rounded-md font-medium text-white">
      {children}
      <span className="font-satoshi text-lg">{text}</span>
    </div>
  ) : (
    <div className="select-none flex items-center gap-2 cursor-pointer px-3 py-1 bg-white border-[1px] border-black/25 rounded-md font-medium">
      {children}
      <span className="font-satoshi text-lg">{text}</span>
    </div>
  );
}
