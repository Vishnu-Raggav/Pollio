import supabase from "@/lib/supabaseClient";

type signUpProps = { email: string; password: string };

export default async function signUp({ email, password }: signUpProps) {
  const { error } = await supabase.auth.signUp({
    email,
    password,
  });

  if (error) throw error;
}
