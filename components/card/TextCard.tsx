import React from "react";
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
interface textCardProps {
    title: string;
    description: string;
}

const TextCard = ({ title, description }: textCardProps) => {
    return (
        <div className=" w-full flex flex-col justify-start items-center">
            <p className="text-2xl font-bold text-[#bb1b12] mb-2">{title}</p>
            <p className="text-center text-lg text-black">{description}</p>
        </div>
    );
};

export default TextCard;
