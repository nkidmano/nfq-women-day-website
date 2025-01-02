"use client";
import React, { useState, useEffect } from "react";
import { useName } from "@/context/nameContext";
import {
    addPerson,
    checkPerson,
    addTicket,
    deduceTicket,
    checkTicketLeft,
} from "@/database/actions";
import {
    Select,
    SelectContent,
    SelectGroup,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";

import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { useToast } from "@/hooks/use-toast";
import { SelectLabel } from "@radix-ui/react-select";

const locations: string[] = ["Ho Chi Minh", "Da Nang", "Ha Noi", "Can Tho"];

const NameDialog = () => {
    const [empName, setEmpName] = useState("");
    const { setName, isSet, name, setPerson } = useName();
    const [location, setLocation] = useState("Ho Chi Minh");
    const { toast } = useToast();
    const [isSubmitting, setIsSubmitting] = useState(false);

    const submitName = async (name: string, location: string) => {
        if (name == "") {
            toast({
                title: "Name can't be empty",
                description: "Please enter your name",
                variant: "destructive",
            });
            return;
        }
        setIsSubmitting(true);
        name = name.toUpperCase();
        await checkPerson(name)
            .then(async (res) => {
                if (!res) {
                    await addPerson(name, location);
                    setName(name);
                    if (location == "Ho Chi Minh") {
                        const rate = Math.random();
                        // get scratch card
                        if (0.34 <= rate && rate < 0.66) {
                            const amount = Math.floor(Math.random() * 3) + 1;
                            // check ticket left
                            const ticketLeft = await checkTicketLeft(
                                `scratch_${amount}`
                            );

                            if (ticketLeft > 0) {
                                await addTicket(name, amount, "scratch").then(
                                    async (res) => {
                                        await deduceTicket(
                                            1,
                                            `scratch_${amount}`
                                        );
                                        setPerson({
                                            name: name,
                                            ticket: amount,
                                            type: "scratch",
                                        });
                                    }
                                );
                            } else {
                                setPerson({
                                    name: name,
                                    ticket: 0,
                                    type: "none",
                                });
                            }
                        }
                        // food
                        else if (rate >= 0.66) {
                            const amount = Math.floor(Math.random() * 2) + 1;

                            const ticketLeft = await checkTicketLeft(
                                `food_${amount}`
                            );

                            if (ticketLeft > 0) {
                                await addTicket(name, amount, "food").then(
                                    async (res) => {
                                        deduceTicket(1, `food_${amount}`);
                                        setPerson({
                                            name: name,
                                            ticket: amount,
                                            type: "food",
                                        });
                                    }
                                );
                            } else {
                                setPerson({
                                    name: name,
                                    ticket: 0,
                                    type: "none",
                                });
                            }
                        }

                        // none
                        else {
                            setPerson({ name: name, ticket: 0, type: "none" });
                        }
                    } else {
                        const rate = Math.random() > 0.65;
                        if (rate) {
                            const amount = Math.floor(Math.random() * 3) + 1;
                            const ticketLeft = await checkTicketLeft(
                                `scratch_${amount}`
                            );
                            if (ticketLeft > 0) {
                                await addTicket(name, amount, "scratch").then(
                                    async (res) => {
                                        deduceTicket(1, `scratch_${amount}`);
                                        setPerson({
                                            name: name,
                                            ticket: amount,
                                            type: "scratch",
                                        });
                                    }
                                );
                            } else {
                                setPerson({
                                    name: name,
                                    ticket: 0,
                                    type: "none",
                                });
                            }
                        } else {
                            setPerson({ name: name, ticket: 0, type: "none" });
                        }
                    }
                } else {
                    toast({
                        title: "Name already exists",
                        description: "Please enter a different name",
                        variant: "destructive",
                    });
                }
            })
            .finally(() => {
                setIsSubmitting(false);
            });
    };

    return (
        <div className="w-[500px] flex flex-col space-y-4 justify-center items-center">
            <p className="text-3xl text-white">Enter your full name: </p>
            <div className="w-full mx-auto bg-white rounded-full">
                <Input
                    type="text"
                    placeholder="Name"
                    onChange={(e) => setEmpName(e.target.value)}
                    className="w-full border-none focus:ring-0 md:text-xl p-6 m-0 shadow-none placeholder:text-gray-400"
                />
            </div>
            <p className="text-3xl text-white">Select location:</p>
            <Select onValueChange={(value) => setLocation(value)}>
                <SelectTrigger className="w-full bg-white p-6 rounded-full text-xl shadow-none">
                    <SelectValue
                        defaultValue={"Ho Chi Minh"}
                        placeholder={"Ho Chi Minh"}>
                        {location}
                    </SelectValue>
                </SelectTrigger>
                <SelectContent>
                    {locations.map((loc) => (
                        <SelectItem
                            value={loc}
                            key={loc}
                            onClick={() => setLocation(loc)}
                            className="text-xl">
                            {loc}
                        </SelectItem>
                    ))}
                </SelectContent>
            </Select>
            <div className="w-full flex justify-end items-center">
                <Button
                    onClick={() => {
                        submitName(empName, location);
                    }}
                    disabled={isSubmitting}
                    className={`
                    ${
                        isSubmitting
                            ? "cursor-not-allowed bg-[#fbc13a]/50 hover:bg-[#fbc13a]/50 w-full text-xl p-6 rounded-full shadow-none text-white"
                            : "w-full text-xl p-6 rounded-full shadow-none bg-[#fbc13a] text-white hover:bg-[#fbc13a]/90"
                    }`}>
                    {isSubmitting ? "Submitting..." : "Submit"}
                </Button>
            </div>
        </div>
    );
};

export default NameDialog;
