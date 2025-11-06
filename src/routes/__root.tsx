import { createRootRoute, Outlet } from "@tanstack/react-router";
import { Toaster } from "sonner";
import { useMediaQuery } from "react-responsive";

export const Route = createRootRoute({
  component: RouteComponent,
});

function RouteComponent() {
  const isDesktop = useMediaQuery({ query: "(min-width: 1024px)" });

  return (
    <>
      <Outlet />
      <Toaster
        richColors
        position={isDesktop ? "bottom-center" : "top-center"}
        visibleToasts={2}
      />
    </>
  );
}
