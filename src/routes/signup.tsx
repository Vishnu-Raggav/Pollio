import { createFileRoute } from "@tanstack/react-router";

// Images
import logo from "/logo.svg";
import Button from "@/components/Button";
import { Mail } from "lucide-react";

export const Route = createFileRoute("/signup")({
  component: RouteComponent,
});

function RouteComponent() {
  return (
    <div className="w-screen h-screen bg-off-white flex flex-col items-center pt-38 gap-12">
      <img src={logo} className="size-7" />
      <div className="flex flex-col items-center gap-2">
        <span className="font-satoshi-bold text-3xl">Create An Account</span>
        <span className="font-satoshi-medium text-lg text-black/50">
          Get started for free and make your first poll today.
        </span>
      </div>
      <form className="flex flex-col items-center gap-8 font-satoshi-medium mt-4">
        <input
          placeholder="Email"
          className="text-md w-[30vw] rounded-lg border-2 border-black/25 px-4 py-2 focus:outline-1 focus:outline-black/25 focus:bg-white"
        />
        <input
          placeholder="Password"
          className="text-md w-[30vw] rounded-lg border-2 border-black/25 px-4 py-2 focus:outline-1 focus:outline-black/25 focus:bg-white"
        />
        <input
          placeholder="Confirm Password"
          className="text-md w-[30vw] rounded-lg border-2 border-black/25 px-4 py-2 focus:outline-1 focus:outline-black/25 focus:bg-white"
        />
        <div className="flex flex-col items-center gap-4 mt-10">
          <Button text="Sign Up" variant={"primary"}>
            <Mail className="size-4" />
          </Button>
          <span className="text-md text-black/50">
            Already have an account? <span className="text-black">Log In</span>
          </span>
        </div>
      </form>
    </div>
  );
}
