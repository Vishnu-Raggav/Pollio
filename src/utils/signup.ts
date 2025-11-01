import supabase from "@/lib/supabaseClient";

type signupProps = { email: string; password: string };

export default async function signup({ email, password }: signupProps) {
  const { error } = await supabase.auth.signUp({
    email,
    password,
    options: {
      emailRedirectTo: window.origin + "/dashboard",
    },
  });

  if (error) throw error;
}
