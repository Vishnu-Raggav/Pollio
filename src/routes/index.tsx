import { createFileRoute } from "@tanstack/react-router";

// Images
import logo from "/logo.svg";

// Icons
import { LogIn, Sparkle } from "lucide-react";

// Components
import Button from "@/components/Button";

// Libs
import cn from "@/utils/cn";
import { useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";

gsap.registerPlugin(useGSAP);

export const Route = createFileRoute("/")({
  component: RouteComponent,
});

function RouteComponent() {
  return (
    <div className="relative w-screen h-screen bg-off-white pt-20 pl-30 pr-40">
      <header className="flex items-center justify-between w-full h-fit">
        <div className="flex items-center gap-6">
          <img src={logo} className="size-7" />
          <span className="font-righteous text-4xl">Pollio</span>
        </div>
        <Button variant={"secondary"} text={"Log In"}>
          <LogIn className="size-4" />
        </Button>
      </header>
      <main className="flex flex-col items-center w-full h-fit pt-30 gap-6">
        <span className="font-satoshi-bold tracking-tight text-center text-6xl/tight">
          The Fastest way to know
          <br />
          what people think
        </span>
        <span className="font-satoshi-medium text-center tracking-tight text-lg text-black/50">
          Turn quick questions into powerful insights,
          <br />
          without the complexity of traditional survey tools.
        </span>

        <div className="mt-14">
          <Button text="Get Started" variant={"primary"}>
            <Sparkle fill="#ffffff" className="size-4" />
          </Button>
        </div>
      </main>

      {/* Background Bars */}
      <Bars position="left" />
      <Bars position="right" />
    </div>
  );
}

function Bars({ position }: { position: "left" | "right" }) {
  const containerRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      gsap.fromTo(
        ".bars",
        { scaleY: 0 },
        { scaleY: 1, stagger: 0.2, duration: 0.5 }
      );
    },
    { scope: containerRef }
  );
  return (
    <div
      ref={containerRef}
      className={cn(
        "pointer-events-none absolute top-0 h-screen w-fit flex items-end gap-20",
        position === "left" ? "left-30" : "right-40 scale-x-[-1]"
      )}
    >
      {Array(3)
        .fill(null)
        .map((_, index) => (
          <div
            key={index}
            style={{ height: `${50 - index * 15}vh` }}
            className="bars w-18 rounded-t-xl border-2 border-black/25 origin-bottom"
          />
        ))}
    </div>
  );
}
