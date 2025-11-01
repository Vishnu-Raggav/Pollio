import { createFileRoute, redirect } from "@tanstack/react-router";

// Helpers
import isAuthenticated from "@/utils/isAuthenticated";

export const Route = createFileRoute("/dashboard")({
  beforeLoad: async () => {
    const loggedIn = await isAuthenticated();
    if (!loggedIn) {
      throw redirect({ to: "/" });
    }
  },
});
