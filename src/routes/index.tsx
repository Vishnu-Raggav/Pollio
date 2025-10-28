import { createFileRoute } from "@tanstack/react-router";

import logo from "/logo.svg";

export const Route = createFileRoute("/")({
  component: RouteComponent,
});

function RouteComponent() {
  return (
    <div className="w-screen h-screen bg-off-white py-20 px-30">
      <header className="w-full h-fit flex items-center">
        <div className="flex items-center gap-6">
          <img src={logo} className="size-7" />
          <span className="font-righteous text-4xl">Pollio</span>
        </div>
      </header>
    </div>
  );
}
