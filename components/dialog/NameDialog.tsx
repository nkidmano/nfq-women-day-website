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
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { useToast } from "@/hooks/use-toast";
const NameDialog = () => {
    const [empName, setEmpName] = useState("");
    const { setName, isSet, name, setPerson } = useName();
    const { toast } = useToast();

    const submitName = async (name: string) => {
        name = name.toUpperCase();
        await checkPerson(name).then(async (res) => {
            if (!res) {
                await addPerson(name);
                setName(name);
                // random a boolean with rate 0.35 0.65
                const rate = Math.random() < 0.65;
                if (!rate) {
                    const ticketLeft = await checkTicketLeft();
                    if (ticketLeft > 0) {
                        const rand = Math.floor(Math.random() * 3);
                        const ticket = Math.min(rand, ticketLeft);
                        await addTicket(name, ticket).then(async (res) => {
                            await deduceTicket(ticket);
                            setPerson({ name: name, ticket: ticket });
                        });
                    } else {
                        setPerson({ name: name, ticket: 0 });
                    }
                } else {
                    setPerson({ name: name, ticket: 0 });
                }
            } else {
                toast({
                    title: "Name already exists",
                    description: "Please enter a different name",
                    variant: "destructive",
                });
            }
        });
    };

    useEffect(() => {
        const handleKeyDown = async (e: any) => {
            if (e.key === "Enter") {
                submitName(empName);
            }
        };

        window.addEventListener("keydown", handleKeyDown);

        // Cleanup the event listener on component unmount
        return () => {
            window.removeEventListener("keydown", handleKeyDown);
        };
    }, [empName, setName]);
    return (
        <div className="w-full flex flex-col space-y-4 justify-center items-center">
            <p className="text-3xl text-white">Enter your full name: </p>
            <div className="w-[500px] p-6 bg-white rounded-full">
                <Input
                    placeholder="Name"
                    onChange={(e) => setEmpName(e.target.value)}
                    className="w-full  border-none ring-visible:none focus:ring-0 text-xl shadow-none"
                    required
                />
            </div>
            {/* 
            <div className="w-full flex justify-end items-center">
                <Button
                    onClick={() => {
                        submitName(empName);
                    }}
                    className="w-full">
                    Submit
                </Button>
            </div> */}
        </div>
    );
};

export default NameDialog;
