// Client
import supabase from "@/lib/supabaseClient";

// Types
import type { SortOptions } from "@/constants/pollSortOptions";

export default async function fetchPolls(sortBy: SortOptions) {
  let query = supabase
    .from("polls")
    .select("id, title, description, created_at, expires_at, votes (poll_id)");

  switch (sortBy) {
    case "Recent":
      query = query.order("created_at", { ascending: false });
      break;
    case "Oldest":
      query = query.order("created_at", { ascending: true });
      break;
    case "Most Votes":
      break;
    case "Least Votes":
      break;
    case "Live":
      query = query
        .gt("expires_at", new Date().toISOString())
        .order("expires_at", { ascending: true });
      break;
    case "Expired":
      query = query
        .lte("expires_at", new Date().toISOString())
        .order("expires_at", { ascending: false });
      break;
  }

  const { data: polls, error } = await query;
  if (error) throw error;
  return polls.map((poll) => ({ ...poll, votes: poll.votes.length }));
}
