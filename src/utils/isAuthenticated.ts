import supabase from "@/lib/supabaseClient";

export default async function isAuthenticated() {
  const { data, error } = await supabase.auth.getSession();
  if (error) throw error;
  return data.session !== null; // true if logged in
}
