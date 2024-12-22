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
        <Card className="bg-[#ba110f] w-full">
            <CardContent className="flex flex-col items-center justify-center p-4 h-fit ">
                <p className="text-2xl font-bold text-[#ffd488] mb-2">
                    {title}
                </p>
                <p className="text-center text-white font-bold">
                    {description}
                </p>
            </CardContent>
        </Card>
    );
};

export default TextCard;
