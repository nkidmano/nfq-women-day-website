'use client'

import { useEffect, useState } from 'react'
import { useName } from '@/context/nameContext'
import NameDialog from '@/components/dialog/NameDialog'
import { Button } from '@/components/ui/button'

import {
  boxTexts,
  fortuneBoosters,
  messages,
  musicVideos,
  refers,
  stayAlerts,
  unfortunate,
} from '@/lib/constants'
import { Card, CardContent, CardHeader } from '@/components/ui/card'
import { MusicVideo } from '@/types'
import TextCard from '@/components/card/TextCard'
import { MysteryBox } from '@/components/decorations/MysteryBox'

export default function Home() {
  const { setName, isSet, name, person } = useName()
  const [music, setMusic] = useState<MusicVideo>(
    musicVideos[Math.floor(Math.random() * musicVideos.length)],
  )
  const [message, setMessage] = useState<string>(
    messages[Math.floor(Math.random() * messages.length)],
  )
  const [fortuneBooster, setFortuneBooster] = useState<string>(
    fortuneBoosters[Math.floor(Math.random() * fortuneBoosters.length)],
  )
  const [stayAlert, setStayAlert] = useState<string>(
    stayAlerts[Math.floor(Math.random() * stayAlerts.length)],
  )
  const [unexpectedFortune, setUnexpectedFortune] = useState<string[]>([])

  useEffect(() => {
    if (person && person.name != '') {
      setUnexpectedFortune(
        refers
          .sort(() => 0.5 - Math.random())
          .slice(0, 2)
          .map((refer) => {
            return `${refer.description} <a href="${refer.url}" target="_blank" className="underline font-bold text-blue-400 z-10">${refer.title}</a> at NFQ.`
          })
          .concat(
            `${
              person.ticket > 0
                ? person.type == 'scratch'
                  ? `🎉 You get <span className="font-bold"> ${
                    person.ticket
                  } scratch ${
                    person.ticket > 1 ? 'cards' : 'card'
                  }</span> for a mini-event which will happen after Tet! 🎉`
                  : `🎉 You get  <span className="font-bold">${
                    person.ticket
                  } ${
                    person.ticket > 1
                      ? 'tickets'
                      : 'ticket'
                  }</span> for <a href="https://nfq-international.slack.com/archives/C053CBZ6CQK/p1735542936734629" target="_blank" className="underline font-bold text-blue-400 z-10">Tết Xóm Tech</a>! 🎉`
                : `${
                  unfortunate[
                    Math.floor(
                      Math.random() * unfortunate.length,
                    )
                    ]
                }`
            }`,
          )
          .sort(() => 0.5 - Math.random()),
      )
    }
  }, [person])

  const [isTriggered, setIsTriggered] = useState<boolean>(false)
  /* useEffect(() => {
      setUnexpectedFortune(unexpectedFortune.sort(() => 0.5 - Math.random()));
  }, []); */

  return (
    <div
      className="flex min-h-screen w-full flex-col items-center justify-start bg-cover bg-center bg-no-repeat font-[family-name:var(--font-quicksand)]"
    >
      <div
        className={`flex w-fit flex-col items-center ${
          isSet
            ? 'justify-start space-y-6 my-6'
            : 'justify-center space-y-24 h-screen'
        }`}
      >
        <div className="flex w-full flex-col items-center justify-start space-y-4">
          <h1
            className={`text-center ${
              isSet ? 'text-7xl' : 'text-8xl'
            } font-bold text-white font-[family-name:var(--font-sigmar-one)]`}
          >
            WOMEN'S DAY{' '}
            <br />
            FLOWER - TELLING{' '}
          </h1>
          <p className="text-2xl font-bold text-white">
            ✨Press & Bloom: Discover Your Flower, Embrace Your Power!✨
          </p>
        </div>
        <div className="flex w-full flex-col items-center justify-start space-y-4">
          {isSet ? (
            <div
              className="flex flex-col items-center justify-center space-y-6 text-white"
            >
              <div className="flex w-full items-start justify-center ">
                <p className="text-2xl">
                  Hi
                  <span className="font-bold text-[#fff307]">
                                        {' '}
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
                allowFullScreen
              ></iframe>
              <div className="flex flex-col space-y-6 w-full justify-start items-center">
                <Card>
                  <CardContent
                    className="flex flex-col items-center justify-center space-y-4 p-6 bg-white rounded-xl w-[600px]"
                  >
                    <TextCard
                      title="👇Here Is Your Message👇 "
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
                    onClick={() => setIsTriggered(true)}
                  >
                    <p className="text-lg">
                      Ready to test your New Year's Luck?
                      CLICK HERE!
                    </p>
                  </Button>
                ) : (
                  <Card className="w-[600px]">
                    <CardHeader className="font-bold text-xl text-[#bb1b12] text-center">
                      You will find in the 3 boxes below
                      either ways to trade your bad luck
                      or....a LUCKY GIFTTTT!
                    </CardHeader>
                    <div className="w-full flex justify-center items-center">
                      <CardContent
                        className="flex flex-col items-center justify-center space-y-4 px-6 pb-6 bg-white rounded-xl w-[600px]"
                      >
                        {unexpectedFortune.map(
                          (fortune, index) => (
                            <MysteryBox
                              key={index}
                              text={fortune}
                              boxText={
                                boxTexts[index]
                              }
                            />
                          ),
                        )}
                      </CardContent>
                    </div>
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
  )
}
