import { createClient } from "@supabase/supabase-js"

const supabaseurl = process.env.NEXT_PUBLIC_SUPABASE_URL
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY

const clientSupabase = createClient(supabaseurl, supabaseAnonKey)

export default clientSupabase