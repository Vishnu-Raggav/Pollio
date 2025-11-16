// Client
import supabase from "@/lib/supabaseClient";

export default async function getPoll(poll_id: number) {
  const { data: pollData, error } = await supabase
    .from("polls")
    .select(
      "id, title, description, created_at, expires_at, votes (poll_id, option)"
    )
    .eq("id", poll_id)
    .single();
  if (error) throw error;
  return pollData;
}
