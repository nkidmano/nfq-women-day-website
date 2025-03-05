'use server'

import { createClient } from '@supabase/supabase-js'
import { Person } from '@/types'

// Initialize Supabase client
const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
)

export const addPerson = async (name: string, location: string) => {
  const { error } = await supabase
    .from('person')
    .insert([
      { full_name: name, location: location }
    ])

  if (error) throw error
}

export const checkPerson = async (name: string): Promise<boolean> => {
  const { data, error } = await supabase
    .from('person')
    .select('*')
    .eq('full_name', name)
    .single()

  if (error && error.code !== 'PGRST116') return false // PGRST116 is the "not found" error
  return !!data
}

export const addTicket = async (
  name: string,
  ticketAmount: number,
  type: string,
) => {
  const { error } = await supabase
    .from('person')
    .update({
      ticket: ticketAmount,
      type: type
    })
    .eq('full_name', name)

  if (error) throw error
}

export const deduceTicket = async (ticketAmount: number, id: string) => {
  // Using a transaction to ensure atomic update
  const { data: currentTickets, error: fetchError } = await supabase
    .from('ticket_left')
    .select('num_left')
    .eq('id', id)
    .single()

  if (fetchError) throw fetchError

  const newAmount = currentTickets.num_left - ticketAmount

  const { error: updateError } = await supabase
    .from('ticket_left')
    .update({ num_left: newAmount })
    .eq('id', id)

  if (updateError) throw updateError
}

export const checkTicketLeft = async (id: string): Promise<number> => {
  const { data, error } = await supabase
    .from('ticket_left')
    .select('num_left')
    .eq('id', id)
    .single()

  if (error) throw error
  return data.num_left
}

export const getPerson = async (name: string): Promise<Person> => {
  const { data, error } = await supabase
    .from('person')
    .select('full_name, ticket, type')
    .eq('full_name', name)
    .single()

  if (error) throw error

  const person: Person = {
    name: data.full_name,
    ticket: data.ticket,
    type: data.type,
  }

  return person
}