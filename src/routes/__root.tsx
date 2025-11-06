import { createRootRoute, Outlet } from "@tanstack/react-router";
import { Toaster } from "sonner";
import { useMediaQuery } from "react-responsive";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

export const Route = createRootRoute({
  component: RouteComponent,
});

const queryClient = new QueryClient();

function RouteComponent() {
  const isDesktop = useMediaQuery({ query: "(min-width: 1024px)" });

  return (
    <QueryClientProvider client={queryClient}>
      <Outlet />
      <Toaster
        richColors
        position={isDesktop ? "bottom-center" : "top-center"}
        visibleToasts={2}
      />
    </QueryClientProvider>
  );
}
