// Client
import supabase from "@/lib/supabaseClient";

export default async function logout() {
  const { error } = await supabase.auth.signOut();
  if (error) throw error;
}
