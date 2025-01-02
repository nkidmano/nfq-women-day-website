"use server";
import { sql } from "@vercel/postgres";
import { Person } from "@/types";

export const addPerson = async (name: string, location: string) => {
    await sql`INSERT INTO person (full_name, location) VALUES (${name}, ${location})`;
};

export const checkPerson = async (name: string): Promise<boolean> => {
    const { rows, fields } =
        await sql`SELECT * FROM person WHERE full_name = ${name}`;
    return rows.length > 0;
};

export const addTicket = async (
    name: string,
    ticketAmount: number,
    type: string
) => {
    // update ticket of name in table person
    await sql`UPDATE person SET ticket = ${ticketAmount}, type = ${type} WHERE full_name = ${name}`;
};

export const deduceTicket = async (ticketAmount: number, id: string) => {
    await sql`UPDATE ticket_left SET num_left = num_left - ${ticketAmount} WHERE id = ${id}`;
};

export const checkTicketLeft = async (id: string): Promise<number> => {
    const { rows, fields } =
        await sql`SELECT * FROM ticket_left WHERE id = ${id}`;
    return rows[0]["num_left"];
};

export const getPerson = async (name: string): Promise<Person> => {
    const { rows, fields } =
        await sql`SELECT * FROM person WHERE full_name = ${name}`;
    const person: Person = {
        name: rows[0]["full_name"],
        ticket: rows[0]["ticket"],
        type: rows[0]["type"],
    };

    return person;
};
