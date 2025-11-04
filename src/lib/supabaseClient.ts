import { createClient } from "@supabase/supabase-js";
import { type Database } from "@/lib/types/database.types";

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseKey = import.meta.env.VITE_SUPABASE_KEY;

const client = createClient<Database>(supabaseUrl, supabaseKey);
export default client;
