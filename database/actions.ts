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

export const getPerson = async (email: string): Promise<{ data: Person | null, error: any}> => {
  const { data, error } = await supabase
    .from('person')
    .select('*')
    .eq('email', email)
    .single()

  const person = data ? {
    email: data?.email,
    location: data?.location,
    giftAmount: data?.gift_amount,
  } : null

  return { data: person, error }
}

export const updatePersonGiftAmount = async (email: string, giftAmount: number) => {
  const { data, error } = await supabase
    .from('person')
    .update({ gift_amount: giftAmount })
    .eq('email', email)

  return { data, error }
}

// people with 2 gifts are special
export const getCountSpecialGift = async () => {
  const { data, error } = await supabase
    .from('person')
    .select('*')
    .eq('gift_amount', 2)

  return { data: data?.length ?? 10, error }
}
