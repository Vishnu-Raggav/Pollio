import { createFileRoute } from "@tanstack/react-router";

// Images
import logo from "/logo.svg";

// Types
import type { ComponentProps } from "react";

// Libs
import { useState } from "react";

// Helpers
import cn from "@/utils/cn";

export const Route = createFileRoute("/vote/$pollId")({
  component: RouteComponent,
});

const pollOptions = ["Pizza", "Burger", "Pasta", "Sushi"];

function RouteComponent() {
  const [showDescription, setShowDescription] = useState(false);
  const [clicked, setClicked] = useState<number | null>(null);

  return (
    <div className="font-satoshi-medium relative w-screen min-h-screen flex flex-col items-center bg-off-white pt-40 pb-20 px-30 max-md:px-10 max-md:pt-20 gap-18 max-md:gap-14">
      {/* Logo */}
      <img src={logo} className="size-7 max-md:size-5" />

      {/* Poll Title */}
      <div className="flex flex-col items-center gap-8">
        <span className="font-satoshi-bold text-center text-3xl max-md:text-xl">
          If you could instantly master any skill in the world, what would you
          choose and why?
        </span>
        {showDescription && (
          <span className="w-4/5 text-center text-xl max-md:text-base text-black/50">
            Food brings people together, but everyone has their own favorite!
            🍕🍔🍝🍣 Cast your vote and help us settle the ultimate debate —
            which comfort food deserves the crown? Whether you're team pizza,
            burger, pasta, or sushi, your opinion counts. Let’s see which dish
            wins the crowd’s heart! Food brings people together, but everyone
            has their own favorite! 🍕🍔🍝🍣 Cast your vote and help us settle
            the ultimate debate — which comfort food deserves the crown? Whether
            you're team pizza, burger, pasta, or sushi, your opinion counts.
            Let’s see which dish wins the crowd’s heart! Food brings people
            together, but everyone has their own favorite! 🍕🍔🍝🍣 Cast your
            vote and help us settle the ultimate debate — which comfort food
            deserves the crown? Whether you're team pizza, burger, pasta, or
            sushi, your opinion counts. Let’s see which dish wins the crowd’s
            heart!
          </span>
        )}
        <span
          onClick={() => setShowDescription((prev) => !prev)}
          className="cursor-pointer text-xl max-md:text-base text-black/50"
        >
          {showDescription ? "hide description" : "show description"}
        </span>
      </div>

      {/* Poll Options */}
      <div className="w-1/2 max-lg:w-2/3 max-md:w-9/10 flex flex-col text-xl max-md:text-base gap-6">
        {pollOptions.map((option, index) => (
          <VoteOption
            key={index}
            disabled={false}
            active={clicked === index}
            onClick={() => setClicked(index)}
          >
            {option}
          </VoteOption>
        ))}
      </div>
    </div>
  );
}

type VoteOptionProps = ComponentProps<"div"> & {
  children: string;
  active: boolean;
  disabled: boolean;
};

function VoteOption({ active, disabled, children, ...props }: VoteOptionProps) {
  return (
    <div
      {...props}
      className={cn(
        "cursor-pointer grid place-items-center w-full rounded-xl border-2 px-8 py-2 transition-colors duration-100",
        active
          ? "bg-white outline outline-black border-black"
          : "border-black/25",
        disabled && "border-black/25 text-black/25"
      )}
    >
      {children}
    </div>
  );
}
