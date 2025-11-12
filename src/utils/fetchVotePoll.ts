// Client
import supabase from "@/lib/supabaseClient";

// Types
import type { Database } from "@/lib/types/database.types";

export default async function fetchVotePoll(
  poll_id: Database["public"]["Tables"]["polls"]["Row"]["id"]
) {
  const { data, error } = await supabase
    .from("polls")
    .select()
    .eq("id", poll_id)
    .limit(1);

  if (error) throw new Error("Something went wrong fetching poll");
  if (!data || data.length === 0) throw new Error("Poll not found");

  const poll = data[0];

  // Check expiration
  const pollExpiryDate = new Date(poll.expires_at);
  if (new Date() > pollExpiryDate) throw new Error("Poll has ended");

  return poll;
}
