import { createFileRoute, useNavigate } from "@tanstack/react-router";

// Images
import logo from "/logo.svg";

// Components
import Button from "@/components/Button";
import PollCard from "@/components/PollCard";
import { ChevronDown, LogOut, Plus } from "lucide-react";

// Libs
import { toast } from "sonner";

// Helpers
import logout from "@/utils/logout";

export const Route = createFileRoute("/dashboard/")({
  component: RouteComponent,
});

function RouteComponent() {
  const navigate = useNavigate();

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
                return "Logged out successfully ✨";
              },
              error: "Logout failed 😞 Please try again",
            });
          }}
        >
          <LogOut className="size-4 max-md:size-3" />
        </Button>
      </header>

      <div className="w-full h-fit flex gap-4">
        <Button variant={"primary"} text={"New Poll"}>
          <Plus className="size-4 max-md:size-3" />
        </Button>
        <Button variant={"secondary"} text={"Sort By: Recent"}>
          <ChevronDown className="size-4 max-md:size-3" />
        </Button>
      </div>

      <main className="flex flex-col gap-6">
        <PollCard
          status="Live"
          title="some title"
          votes={12}
          date="2025-11-07T05:30:00.000Z"
        />
        <PollCard
          status="Expired"
          title="some title"
          votes={12}
          date="2025-11-07T05:30:00.000Z"
        />
      </main>
    </div>
  );
}
