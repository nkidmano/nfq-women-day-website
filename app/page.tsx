"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { useName } from "@/context/nameContext";
import NameDialog from "@/components/dialog/NameDialog";
import { Button } from "@/components/ui/button";
import parse from "html-react-parser";
import {
    musicVideos,
    messages,
    fortuneBoosters,
    stayAlerts,
    unexpectedFortunes,
} from "@/lib/constants";
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import { MusicVideo } from "@/types";
import FortuneReveal from "@/components/decorations/MysteryBox";
import {
    Carousel,
    CarouselContent,
    CarouselItem,
    CarouselNext,
    CarouselPrevious,
} from "@/components/ui/carousel";
import TextCard from "@/components/card/TextCard";

export default function Home() {
    const { setName, isSet, name } = useName();
    const [music, setMusic] = useState<MusicVideo>(
        musicVideos[Math.floor(Math.random() * musicVideos.length)]
    );
    const [message, setMessage] = useState<string>(
        messages[Math.floor(Math.random() * messages.length)]
    );
    const [fortuneBooster, setFortuneBooster] = useState<string>(
        fortuneBoosters[Math.floor(Math.random() * fortuneBoosters.length)]
    );
    const [stayAlert, setStayAlert] = useState<string>(
        stayAlerts[Math.floor(Math.random() * stayAlerts.length)]
    );
    const [unexpectedFortune, setUnexpectedFortune] = useState<string[]>(
        unexpectedFortunes
            .sort(() => 0.5 - Math.random())
            .slice(0, 2)
            .concat("Refer your friends to NFQ.")
    );

    useEffect(() => {
        setUnexpectedFortune(unexpectedFortune.sort(() => 0.5 - Math.random()));
    }, []);

    return (
        <div className="flex min-h-screen w-full flex-col items-center justify-start bg-[url('/img/design.png')] bg-cover bg-center bg-no-repeat font-[family-name:var(--font-geist-sans)]">
            <div className="my-6 flex w-fit flex-col items-center justify-start space-y-6">
                <div className="flex w-full flex-col items-center justify-start space-y-4">
                    <h1 className="text-center text-7xl font-bold text-white">
                        NEW YEAR
                        <br />
                        FORTUNE TELLER{" "}
                    </h1>
                    <p className="text-3xl italic text-white">
                        ✨Step into 2025 with a touch of magic.✨
                    </p>
                </div>
                <Card className="w-full rounded-lg bg-white p-4 shadow-lg">
                    <CardContent>
                        {isSet ? (
                            <div className="flex flex-col items-center justify-center space-y-6">
                                <div className="flex w-full items-start justify-center ">
                                    <p className="text-2xl font-bold">
                                        Hi
                                        <span className="text-red-500">
                                            {" "}
                                            {name}
                                        </span>
                                        ,
                                    </p>
                                </div>
                                <p>
                                    Let this song set the mood for your
                                    incredible 2025.
                                </p>
                                <iframe
                                    width={music.width}
                                    height={music.height}
                                    src={`${music.src}?autoplay=1`}
                                    title={music.title}
                                    frameBorder="0"
                                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                                    referrerPolicy="strict-origin-when-cross-origin"
                                    allowFullScreen></iframe>
                                <div className="flex flex-col space-y-2 w-full justify-start items-center">
                                    <Carousel className="w-full max-w-xl h-fit">
                                        <CarouselContent className="flex justify-start items-center">
                                            <CarouselItem>
                                                <TextCard
                                                    title="👇Here is your message:"
                                                    description={message}
                                                />
                                            </CarouselItem>
                                            <CarouselItem>
                                                <TextCard
                                                    title="🌟 Your Fortune Boosters
                                                        🌟"
                                                    description={fortuneBooster}
                                                />
                                            </CarouselItem>
                                            <CarouselItem>
                                                <TextCard
                                                    title="⚠️Stay alert for⚠️"
                                                    description={stayAlert}
                                                />
                                            </CarouselItem>
                                            <CarouselItem>
                                                <FortuneReveal
                                                    unexpectedFortune={
                                                        unexpectedFortune
                                                    }
                                                />
                                                {/* <Card className="bg-[#ba110f] w-full">
                                                    <CardContent className="flex flex-col items-center justify-center p-6 h-fit">
                                                        {!trigger ? (
                                                            <Button
                                                                onClick={() =>
                                                                    setTrigger(
                                                                        true
                                                                    )
                                                                }
                                                                variant="ghost"
                                                                className="hover:bg-inherit">
                                                                <p className="text-[#ffd488] text-lg font-bold hover:underline">
                                                                    Click if
                                                                    you're brave
                                                                    enough to
                                                                    see the
                                                                    unexpected.
                                                                </p>
                                                            </Button>
                                                        ) : (
                                                            <div className="w-full">
                                                                <CardHeader className="text-center">
                                                                    Unlock These
                                                                    3 Fortune
                                                                    Boosters:
                                                                </CardHeader>
                                                                <div className="flex flex-col items-center justify-start space-y-2 mt-2">
                                                                    {unexpectedFortune.map(
                                                                        (
                                                                            fortune,
                                                                            index
                                                                        ) => (
                                                                            <MysteryBox
                                                                                key={
                                                                                    index
                                                                                }
                                                                                message={
                                                                                    fortune
                                                                                }
                                                                            />
                                                                        )
                                                                    )}
                                                                </div>
                                                            </div>
                                                        )}
                                                    </CardContent>
                                                </Card> */}
                                            </CarouselItem>
                                        </CarouselContent>
                                        {/* <CarouselPrevious />
                                        <CarouselNext /> */}
                                    </Carousel>
                                    <p className="text-slate-400 text-lg italic">
                                        Swipe left and right to see more
                                    </p>
                                </div>
                            </div>
                        ) : (
                            <NameDialog />
                        )}
                    </CardContent>
                </Card>
            </div>
        </div>
    );
}
