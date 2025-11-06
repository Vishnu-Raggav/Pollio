import { createFileRoute } from "@tanstack/react-router";

// Images
import logo from "/logo.svg";

// Components
import { LogOut } from "lucide-react";
import Button from "@/components/Button";

export const Route = createFileRoute("/dashboard/")({
  component: RouteComponent,
});

function RouteComponent() {
  return (
    <div className="relative w-screen h-screen bg-off-white pt-20 pl-30 pr-40 max-md:px-10 max-md:pt-10 max-lg:px-20">
      <header className="flex items-center justify-between w-full h-fit">
        <div className="flex items-center gap-6 max-md:gap-4">
          <img src={logo} className="size-7 max-md:size-4" />
          <span className="font-righteous text-4xl max-md:text-2xl">
            Pollio
          </span>
        </div>
        <Button variant={"secondary"} text={"Logout"}>
          <LogOut className="size-4 max-md:size-3" />
        </Button>
      </header>
    </div>
  );
}
