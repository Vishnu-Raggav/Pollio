// Helpers
import cn from "@/utils/cn";

// Libs
import { formatDistanceToNow } from "date-fns";

type PollCardProps = {
  title: string;
  status: "Live" | "Expired";
  votes: number;
  date: string;
};

export default function PollCard({
  status,
  title,
  votes,
  date,
}: PollCardProps) {
  const relativeDate = formatDistanceToNow(new Date(date), { addSuffix: true });

  return (
    <div className="cursor-pointer font-satoshi-medium w-full h-fit flex flex-col rounded-md gap-4 border-2 border-black/25 p-6">
      {/* Status Indicator */}
      <span
        className={cn(
          "w-fit h-fit px-2 py-1 rounded-sm",
          status === "Live" && "bg-green-100 text-green-600",
          status === "Expired" && "bg-neutral-200 text-neutral-600"
        )}
      >
        {status}
      </span>

      {/* Title */}
      <span className="text-black text-xl">{title}</span>

      {/* Details */}
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
