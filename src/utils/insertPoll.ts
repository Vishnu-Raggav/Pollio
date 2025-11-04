// Client
import supabase from "@/lib/supabaseClient";

// Types
import { type Database } from "@/lib/types/database.types";

export default async function insertPoll(
  data: Database["public"]["Tables"]["polls"]["Insert"]
) {
  const { error } = await supabase.from("polls").insert(data);
  if (error) throw error;
}
