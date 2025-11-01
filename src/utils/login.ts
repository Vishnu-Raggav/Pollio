import supabase from "@/lib/supabaseClient";

type loginProps = { email: string; password: string };

export default async function login({ email, password }: loginProps) {
  const { error } = await supabase.auth.signInWithPassword({
    email,
    password,
  });

  if (error) throw error;
}
