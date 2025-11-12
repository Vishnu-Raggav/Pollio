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

  if (error) throw new Error("Poll not found");

  const pollExpiryDate = new Date(data[0].expires_at);
  const todayDate = new Date();
  if (todayDate > pollExpiryDate) throw new Error("Poll has ended");
  return data[0];
}
