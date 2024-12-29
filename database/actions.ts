"use server";
import { sql } from "@vercel/postgres";
import { Person } from "@/types";

export const addPerson = async (name: string) => {
    await sql`INSERT INTO person (full_name) VALUES (${name})`;
};

export const checkPerson = async (name: string): Promise<boolean> => {
    const { rows, fields } =
        await sql`SELECT * FROM person WHERE full_name = ${name}`;
    return rows.length > 0;
};

export const addTicket = async (name: string, ticketAmount: number) => {
    // update ticket of name in table person
    await sql`UPDATE person SET ticket = ${ticketAmount} WHERE full_name = ${name}`;
};

export const deduceTicket = async (ticketAmount: number) => {
    await sql`UPDATE ticket_left SET ticket_left = ticket_left - ${ticketAmount} WHERE ticket_primary = 1`;
};

export const checkTicketLeft = async (): Promise<number> => {
    const { rows, fields } =
        await sql`SELECT * FROM ticket_left WHERE ticket_primary = 1`;
    return rows[0]["ticket_left"];
};

export const getPerson = async (name: string): Promise<Person> => {
    const { rows, fields } =
        await sql`SELECT * FROM person WHERE full_name = ${name}`;
    const person: Person = {
        name: rows[0]["full_name"],
        ticket: rows[0]["ticket"],
    };
    return person;
};
