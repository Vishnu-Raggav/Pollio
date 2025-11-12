// Client
import supabase from "@/lib/supabaseClient";

// Types
import type { Database } from "@/lib/types/database.types";

type insertVoteProps = {
  poll_id: Database["public"]["Tables"]["votes"]["Insert"]["poll_id"];
  option: Database["public"]["Tables"]["votes"]["Insert"]["option"];
};

export default async function insertVote({ poll_id, option }: insertVoteProps) {
  const { error } = await supabase.from("votes").insert({ poll_id, option });
  if (error) throw error;
}
