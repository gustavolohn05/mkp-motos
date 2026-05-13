import { createClient } from '@supabase/supabase-js'

const url = (import.meta as any).env.VITE_SUPABASE_URL
const key = (import.meta as any).env.VITE_SUPABASE_ANON_KEY

console.log('Supabase URL:', url)
console.log('Supabase KEY:', key ? 'definida' : 'indefinida')

export const supabase = createClient(url, key)