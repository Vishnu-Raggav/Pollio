import {
  createFileRoute,
  useNavigate,
  Link,
  redirect,
} from "@tanstack/react-router";

// Images
import logo from "/logo.svg";

// Components
import Button from "@/components/Button";
import PollCard from "@/components/PollCard";
import { ChevronDown, LogOut, Plus } from "lucide-react";

// Libs
import { toast } from "sonner";
import { useState } from "react";
import { useQuery, useQueryClient } from "@tanstack/react-query";

// Helpers
import logout from "@/utils/logout";
import fetchPolls from "@/utils/fetchPolls";
import isAuthenticated from "@/utils/isAuthenticated";

// Constants
import { sortOptions, type SortOptions } from "@/constants/pollSortOptions";

export const Route = createFileRoute("/dashboard/")({
  component: RouteComponent,
  beforeLoad: async () => {
    const loggedIn = await isAuthenticated();
    if (!loggedIn) {
      throw redirect({ to: "/" });
    }
  },
});

function RouteComponent() {
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const [sortBy, setSortBy] = useState<SortOptions>("Recent");

  const {
    data: polls,
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["polls", sortBy],
    queryFn: () => fetchPolls(sortBy),
    staleTime: Infinity,
  });

  return (
    <div className="relative flex flex-col w-screen min-h-screen bg-off-white gap-16 py-20 px-30 max-md:px-10 max-md:pt-10 max-lg:px-20">
      <header className="flex items-center justify-between w-full h-fit">
        <div className="flex items-center gap-6 max-md:gap-4">
          <img src={logo} className="size-7 max-md:size-4" />
          <span className="font-righteous text-4xl max-md:text-2xl">
            Pollio
          </span>
        </div>
        <Button
          variant={"secondary"}
          text={"Logout"}
          onClick={() => {
            toast.promise(logout, {
              loading: "Logging out... Please wait ⏳",
              success: () => {
                navigate({ to: "/" });
                queryClient.clear();
                return "Logged out successfully ✨";
              },
              error: "Logout failed 😞 Please try again",
            });
          }}
        >
          <LogOut className="size-4 max-md:size-3" />
        </Button>
      </header>

      <div className="relative w-fit h-fit flex gap-4">
        <Link to="/dashboard/create-poll">
          <Button variant={"primary"} text={"New Poll"}>
            <Plus className="size-4 max-md:size-3" />
          </Button>
        </Link>
        <Button
          variant={"secondary"}
          text={`Sort By: ${sortBy}`}
          onClick={() => {
            const index = sortOptions.findIndex((value) => value === sortBy);
            if (index < sortOptions.length - 1)
              setSortBy(sortOptions[index + 1]);
            else setSortBy(sortOptions[0]);
          }}
        >
          <ChevronDown className="size-4 max-md:size-3" />
        </Button>
      </div>

      <main className="flex flex-col gap-6">
        {(isLoading || isError) && <PollCard isLoading={true} />}
        {polls?.map((poll) => {
          const pollStatus =
            new Date() > new Date(poll.expires_at) ? "Expired" : "Live";
          return (
            <PollCard
              key={poll.id}
              title={poll.title}
              status={pollStatus}
              votes={poll.votes}
              isLoading={false}
              date={
                pollStatus === "Expired" ? poll.created_at : poll.expires_at
              }
            />
          );
        })}
      </main>
    </div>
  );
}
