import { createFileRoute, Link } from "@tanstack/react-router";

// Images
import logo from "/logo.svg";

// Types
import type { ComponentProps } from "react";

// Libs
import { toast } from "sonner";
import { useState, useEffect } from "react";
import { useQuery, useMutation } from "@tanstack/react-query";

// Helpers
import cn from "@/utils/cn";
import insertVote from "@/utils/insertVote";
import fetchVotePoll from "@/utils/fetchVotePoll";

export const Route = createFileRoute("/vote/$pollId")({
  component: RouteComponent,
});

function RouteComponent() {
  // Path Params
  const { pollId } = Route.useParams();

  // Data Fetching
  const { data, isLoading, isError, error } = useQuery({
    queryKey: ["votePoll", pollId],
    queryFn: () => fetchVotePoll(parseInt(pollId)),
  });

  // Data Mutation
  const mutation = useMutation({ mutationFn: insertVote });

  // UI states
  const [disableVote, setDisableVote] = useState(false);
  const [clicked, setClicked] = useState<number | null>(null);
  const [showDescription, setShowDescription] = useState(false);

  // check vote status
  useEffect(() => {
    if (localStorage.getItem("voted")) {
      setDisableVote(true);
      toast.error("You have already voted");
    }
  }, []);

  if (isLoading) {
    return (
      <div className="font-satoshi-bold relative w-screen min-h-screen flex flex-col justify-center items-center bg-off-white">
        <span className="text-3xl">Loading...</span>
      </div>
    );
  }

  if (isError) {
    return (
      <div className="font-satoshi-bold relative w-screen min-h-screen flex flex-col justify-center items-center bg-off-white">
        <span className="text-3xl">{error.message}</span>
      </div>
    );
  }

  return (
    <div className="font-satoshi-medium relative w-screen min-h-screen flex flex-col items-center bg-off-white pt-40 pb-20 px-30 max-md:px-10 max-md:pt-20 gap-18 max-md:gap-14">
      {/* Logo */}
      <Link to="/">
        <img src={logo} className="size-7 max-md:size-5" />
      </Link>

      {/* Poll Title */}
      <div className="flex flex-col items-center gap-8">
        <span className="font-satoshi-bold text-center text-3xl max-md:text-xl">
          {data?.title}
        </span>
        {showDescription && (
          <span className="w-4/5 text-center text-xl max-md:text-base text-black/50">
            {data?.description}
          </span>
        )}
        {data?.description !== null && (
          <span
            onClick={() => setShowDescription((prev) => !prev)}
            className="cursor-pointer text-xl max-md:text-base text-black/50"
          >
            {showDescription ? "hide description" : "show description"}
          </span>
        )}
      </div>

      {/* Poll Options */}
      <div className="w-1/2 max-lg:w-2/3 max-md:w-9/10 flex flex-col text-xl max-md:text-base gap-6">
        {data?.options.map((option, index) => (
          <VoteOption
            key={index}
            disabled={disableVote}
            active={clicked === index}
            onClick={
              disableVote
                ? undefined
                : () => {
                    setClicked(index);
                    toast.promise(
                      mutation.mutateAsync({
                        poll_id: parseInt(pollId),
                        option,
                      }),
                      {
                        loading: "Submitting your vote...",
                        success: () => {
                          setDisableVote(true);
                          localStorage.setItem("voted", "true");
                          return "Vote submitted successfully!";
                        },
                        error: "Failed to submit your vote. Please try again.",
                      }
                    );
                  }
            }
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
