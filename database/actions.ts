'use server'

import { createClient } from '@supabase/supabase-js'
import { Person } from '@/types'

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
)

export const addPerson = async (email: string, location: string) => {
  const { data, error } = await supabase
    .from('person')
    .insert([{ email, location }])

  return { data, error }
}

export const getPerson = async (email: string): Promise<{ data: Person, error: any}> => {
  const { data, error } = await supabase
    .from('person')
    .select('*')
    .eq('email', email)
    .single()

  return { data, error }
}
