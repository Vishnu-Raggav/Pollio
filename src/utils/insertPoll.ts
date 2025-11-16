// Client
import supabase from "@/lib/supabaseClient";

// Types
import { type Database } from "@/lib/types/database.types";

export default async function insertPoll(
  data: Database["public"]["Tables"]["polls"]["Insert"]
) {
  const { data: createdPoll, error } = await supabase
    .from("polls")
    .insert(data)
    .select()
    .single();
  if (error) throw error;
  return createdPoll;
}
