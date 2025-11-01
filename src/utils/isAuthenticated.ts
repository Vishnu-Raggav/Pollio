import supabase from "@/lib/supabaseClient";

export default async function isAuthenticated() {
  const { error } = await supabase.auth.getSession();
  if (error) throw error;
}
