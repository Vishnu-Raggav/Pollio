// Libs
import { useEffect, useState } from "react";
import { formatDistanceToNow } from "date-fns";

// Helpers
import cn from "@/utils/cn";

type isLoadingPollCardProps = {
  isLoading: true;
};

type notLoadingPollCardProps = {
  date: string;
  votes: number;
  title: string;
  isLoading: false;
  status: "Live" | "Expired";
};

type PollCardProps = isLoadingPollCardProps | notLoadingPollCardProps;

function isLoadingPollCard(
  props: PollCardProps
): props is isLoadingPollCardProps {
  return props.isLoading;
}

export default function PollCard(props: PollCardProps) {
  const isLoading = isLoadingPollCard(props);

  // Hooks must be called unconditionally
  const [relativeDate, setRelativeDate] = useState<string>("");

  useEffect(() => {
    if (isLoading) return; // Don't run this effect when loading

    const date = new Date(props.date);
    setRelativeDate(formatDistanceToNow(date, { addSuffix: true }));

    const interval = setInterval(() => {
      setRelativeDate(formatDistanceToNow(date, { addSuffix: true }));
    }, 20_000);

    return () => clearInterval(interval);
  }, [isLoading, props]);

  if (isLoading) {
    return (
      <div className="cursor-pointer font-satoshi-medium w-full h-fit flex flex-col rounded-md gap-4 border-2 border-black/25 p-6 animate-pulse">
        <div className="rounded-sm w-11 h-8 bg-neutral-500" />
        <div className="rounded-sm w-1/2 h-8 bg-neutral-500" />
        <div className="w-fit items-center flex gap-2">
          <div className="rounded-sm w-16 h-8 bg-neutral-500" />
          <div className="size-1 rounded-full bg-black/50" />
          <div className="rounded-sm w-36 h-8 bg-neutral-500" />
        </div>
      </div>
    );
  }

  // Now safe to destructure
  const { votes, title, status } = props;

  return (
    <div className="cursor-pointer font-satoshi-medium w-full h-fit flex flex-col rounded-md gap-4 border-2 border-black/25 p-6">
      <span
        className={cn(
          "w-fit h-fit px-2 py-1 rounded-sm",
          status === "Live" && "bg-green-100 text-green-600",
          status === "Expired" && "bg-neutral-200 text-neutral-600"
        )}
      >
        {status}
      </span>

      <span className="text-black text-xl">{title}</span>

      <div className="w-fit items-center flex gap-2 text-black/50">
        <span>{votes} votes</span>
        <div className="size-1 rounded-full bg-black/50" />
        <span>
          {status === "Live"
            ? "Expires ".concat(relativeDate)
            : "Created ".concat(relativeDate)}
        </span>
      </div>
    </div>
  );
}
