import { createClient } from "@supabase/supabase-js";

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

if (!supabaseKey) {
  throw new Error('SUPABASE_SERVICE_ROLE_KEY não está definida. Defina essa variável de ambiente para operações server-side do Supabase.');
}

export const supabase = createClient(supabaseUrl, supabaseKey);