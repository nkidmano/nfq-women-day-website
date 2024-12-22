"use client";
import React, { useState, useEffect } from "react";
import { useName } from "@/context/nameContext";
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

const NameDialog = () => {
    const [empName, setEmpName] = useState("");
    const { setName, isSet, name } = useName();
    useEffect(() => {
        const handleKeyDown = (e: any) => {
            if (e.key === "Enter") {
                setName(empName);
            }
        };

        window.addEventListener("keydown", handleKeyDown);

        // Cleanup the event listener on component unmount
        return () => {
            window.removeEventListener("keydown", handleKeyDown);
        };
    }, [empName, setName]);
    return (
        <div className="w-full flex flex-col space-y-4 justify-start items-start">
            <p className="font-bold text-2xl">
                Enter your name and see what 2025 has in store for you:{" "}
            </p>
            <Input
                placeholder="Name"
                onChange={(e) => setEmpName(e.target.value)}
                className="w-full border-t-0 border-x-0 border-b-2 border-[#ba110f] ring-visible:none focus:ring-0 focus:border-[#ba110f] text-xl shadow-none rounded-none"
                required
            />
            <div className="w-full flex justify-end items-center">
                <Button
                    onClick={() => {
                        setName(empName);
                    }}
                    className="w-full">
                    Submit
                </Button>
            </div>
        </div>
    );
};

export default NameDialog;
