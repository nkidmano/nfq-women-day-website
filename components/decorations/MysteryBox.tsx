"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ChevronDown, ChevronUp } from "lucide-react";

interface MysteryBoxProps {
    message: string;
    index: number;
}

function MysteryBox({ message, index }: MysteryBoxProps) {
    const [isRevealed, setIsRevealed] = useState(false);

    const variants = {
        hidden: { opacity: 0, y: 20 },
        visible: { opacity: 1, y: 0 },
    };

    return (
        <motion.div
            className="w-full"
            initial="hidden"
            animate="visible"
            variants={variants}
            transition={{ delay: index * 0.2 }}>
            <Card className="bg-[#ffd488] border-none shadow-md hover:shadow-lg transition-shadow">
                <CardContent className="p-2">
                    <Button
                        onClick={() => setIsRevealed(!isRevealed)}
                        variant="ghost"
                        className="w-full text-left hover:bg-[#ffecb3] focus:ring-0"
                        aria-expanded={isRevealed}>
                        <span className="flex-1 font-semibold text-center">
                            Fortune Booster {index + 1}
                        </span>
                        {isRevealed ? (
                            <ChevronUp className="h-4 w-4" />
                        ) : (
                            <ChevronDown className="h-4 w-4" />
                        )}
                    </Button>
                    <AnimatePresence>
                        {isRevealed && (
                            <motion.div
                                initial={{ opacity: 0, height: 0 }}
                                animate={{ opacity: 1, height: "auto" }}
                                exit={{ opacity: 0, height: 0 }}
                                transition={{ duration: 0.3 }}>
                                <p className="mt-2 text-center text-base font-bold text-[#ba110f]">
                                    {message}
                                </p>
                            </motion.div>
                        )}
                    </AnimatePresence>
                </CardContent>
            </Card>
        </motion.div>
    );
}

export default function FortuneReveal({
    unexpectedFortune,
}: {
    unexpectedFortune: string[];
}) {
    const [isExpanded, setIsExpanded] = useState(false);
    const [trigger, setTrigger] = useState<boolean>(false);
    return (
        <Card className="bg-[#ba110f] w-full h-fit min-h-[100px] flex flex-col justify-center items-center">
            {!trigger ? (
                <Button
                    onClick={() => {
                        setTrigger(true);
                        setIsExpanded(true);
                    }}
                    variant="ghost"
                    className="hover:bg-inherit">
                    <p className="text-[#ffd488] text-lg font-bold hover:underline">
                        Click if you're brave enough to see the unexpected.
                    </p>
                </Button>
            ) : (
                <CardContent className="p-4 w-full">
                    <CardHeader className="text-center p-0 mb-4">
                        <h2 className="text-xl font-bold text-[#ffd488]">
                            Unlock Your Fortune Boosters
                        </h2>
                    </CardHeader>
                    <Button
                        onClick={() => setIsExpanded(!isExpanded)}
                        variant="outline"
                        className="w-full mb-4 bg-[#ffd488] text-[#ba110f] border-[#ffd488] hover:bg-[#ffecb3] hover:text-[#ba110f] focus:ring-2 focus:ring-[#ffd488] focus:ring-opacity-50 text-center">
                        <p className="text-center">
                            {isExpanded
                                ? "Hide Fortune Boosters"
                                : "Reveal Fortune Boosters"}
                        </p>
                    </Button>
                    <AnimatePresence>
                        {isExpanded && (
                            <motion.div
                                initial={{ opacity: 0, height: 0 }}
                                animate={{ opacity: 1, height: "auto" }}
                                exit={{ opacity: 0, height: 0 }}
                                className="space-y-4">
                                {unexpectedFortune.map((fortune, index) => (
                                    <MysteryBox
                                        key={index}
                                        message={fortune}
                                        index={index}
                                    />
                                ))}
                            </motion.div>
                        )}
                    </AnimatePresence>
                </CardContent>
            )}
        </Card>
    );
}
