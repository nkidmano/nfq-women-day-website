"use client";

import { useState, useEffect, use } from "react";
import Image from "next/image";
import { useName } from "@/context/nameContext";
import NameDialog from "@/components/dialog/NameDialog";
import { Button } from "@/components/ui/button";

import {
    musicVideos,
    messages,
    fortuneBoosters,
    stayAlerts,
    refers,
    boxTexts,
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
import TextCard from "@/components/card/TextCard";
import { MysteryBox } from "@/components/decorations/MysteryBox";

export default function Home() {
    const { setName, isSet, name, person } = useName();
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
    const [unexpectedFortune, setUnexpectedFortune] = useState<string[]>([]);

    useEffect(() => {
        if (person && person.name != "") {
            setUnexpectedFortune(
                refers
                    .sort(() => 0.5 - Math.random())
                    .slice(0, 2)
                    .map((refer) => {
                        return `Refer your friend for <a href="${refer.url}" target="_blank" className="underline font-bold text-blue-400 z-10">${refer.title}</a> at NFQ.`;
                    })
                    .concat(
                        `${
                            person.ticket > 0
                                ? person.type == "scratch"
                                    ? `🎉 You get ${
                                          person.ticket
                                      } <span className="font-bold">scratch ${
                                          person.ticket > 1 ? "cards" : "card"
                                      }</span> for the upcoming Ferbruary event! 🎉`
                                    : `🎉 You get ${
                                          person.ticket
                                      } <span className="font-bold">${
                                          person.ticket > 1
                                              ? "tickets"
                                              : "ticket"
                                      }</span> for Tết Xóm Tech! 🎉`
                                : "✨ Stay confident and shine brightly! Your time is coming! ✨"
                        }`
                    )
                    .sort(() => 0.5 - Math.random())
            );
        }
    }, [person]);

    const [isTriggered, setIsTriggered] = useState<boolean>(false);
    /* useEffect(() => {
        setUnexpectedFortune(unexpectedFortune.sort(() => 0.5 - Math.random()));
    }, []); */

    return (
        <div className="flex min-h-screen w-full flex-col items-center justify-start bg-[url('/img/design.png')] bg-cover bg-center bg-no-repeat font-[family-name:var(--font-quicksand)]">
            <div
                className={`flex w-fit flex-col items-center ${
                    isSet
                        ? "justify-start space-y-6 my-6"
                        : "justify-center space-y-24 h-screen"
                }`}>
                <div className="flex w-full flex-col items-center justify-start space-y-4">
                    <h1
                        className={`text-center ${
                            isSet ? "text-7xl" : "text-8xl"
                        } font-bold text-white font-[family-name:var(--font-sigmar-one)]`}>
                        NEW YEAR
                        <br />
                        FORTUNE TELLER{" "}
                    </h1>
                    <p className="text-2xl font-bold text-white">
                        ✨Step into 2025 with a touch of magic.✨
                    </p>
                </div>
                <div className="flex w-full flex-col items-center justify-start space-y-4">
                    {isSet ? (
                        <div className="flex flex-col items-center justify-center space-y-6 text-white">
                            <div className="flex w-full items-start justify-center ">
                                <p className="text-2xl">
                                    Hi
                                    <span className="font-bold text-[#fff307]">
                                        {" "}
                                        {name}
                                    </span>
                                    ,
                                </p>
                            </div>
                            <p className="text-xl">
                                Let this song set the mood for your incredible
                                2025.
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
                            <div className="flex flex-col space-y-6 w-full justify-start items-center">
                                <Card>
                                    <CardContent className="flex flex-col items-center justify-center space-y-4 p-6 bg-white rounded-xl w-[600px]">
                                        <TextCard
                                            title="👇Here is your message👇 "
                                            description={message}
                                        />
                                        <TextCard
                                            title="🍀Your Lucky Booster🍀"
                                            description={fortuneBooster}
                                        />
                                        <TextCard
                                            title="⚠️Be Cautious Of⚠️"
                                            description={stayAlert}
                                        />
                                    </CardContent>
                                </Card>

                                {!isTriggered ? (
                                    <Button
                                        className=" text-[#fbc13a] bg-black h-fit font-bold flex flex-col justify-center space-y-4 items-center p-4"
                                        onClick={() => setIsTriggered(true)}>
                                        <p className="text-lg">
                                            Trade Your Bad Luck for Better Luck
                                            - CLICK HERE!
                                        </p>
                                    </Button>
                                ) : (
                                    <Card>
                                        <CardHeader className="font-bold text-xl text-[#bb1b12] text-center">
                                            3 Ways to Trade Bad Luck for Better
                                            Luck
                                        </CardHeader>
                                        <CardContent className="flex flex-col items-center justify-center space-y-4 px-6 pb-6 bg-white rounded-xl w-[600px]">
                                            {unexpectedFortune.map(
                                                (fortune, index) => (
                                                    <MysteryBox
                                                        key={index}
                                                        text={fortune}
                                                        boxText={
                                                            boxTexts[index]
                                                        }
                                                    />
                                                )
                                            )}
                                        </CardContent>
                                    </Card>
                                )}
                            </div>
                        </div>
                    ) : (
                        <NameDialog />
                    )}
                </div>
            </div>
        </div>
    );
}
