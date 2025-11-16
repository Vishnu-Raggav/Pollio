import { createFileRoute } from "@tanstack/react-router";

// Images
import logo from "/logo.svg";

// Libs
import { useQuery } from "@tanstack/react-query";

// Helpers
import getPoll from "@/utils/getPoll";

// Components
import { Trash } from "lucide-react";
import Button from "@/components/Button";

export const Route = createFileRoute("/poll/$pollId")({
  component: RouteComponent,
});

function RouteComponent() {
  // params
  const { pollId } = Route.useParams();

  // query
  const { isLoading, isError } = useQuery({
    queryKey: ["polls", parseInt(pollId)],
    queryFn: () => getPoll(parseInt(pollId)),
    staleTime: Infinity,
  });

  if (isLoading || isError) return "loading";

  return (
    <div className="relative flex flex-col w-screen min-h-screen bg-off-white gap-16 py-20 px-30 max-md:px-10 max-md:pt-10 max-lg:px-20">
      <header className="flex items-center justify-between w-full h-fit">
        <div className="flex items-center gap-6 max-md:gap-4">
          <img src={logo} className="size-7 max-md:size-4" />
          <span className="font-righteous text-4xl max-md:text-2xl">
            Pollio
          </span>
        </div>
        <div>
          <Button variant={"secondary"} text={"Delete"}>
            <Trash className="size-4 max-md:size-3" />
          </Button>
        </div>
      </header>
    </div>
  );
}
