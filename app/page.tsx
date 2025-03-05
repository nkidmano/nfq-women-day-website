'use client'

import React from 'react'
import { useName } from '@/context/nameContext'
import NameDialog from '@/components/dialog/NameDialog'
import { Card, CardContent, CardHeader } from '@/components/ui/card'
import OverlappingImages from '@/components/card/OverlappingImages'
import GiftBox from '@/components/GiftBox'

export default function Home() {
  const { isSet, name } = useName()

  return (
    <div className="flex min-h-screen w-full flex-col items-center justify-start bg-cover bg-center bg-no-repeat font-[family-name:var(--font-inter)]">
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
            } font-bold font-[family-name:var(--font-sigmar-one)]`}
          >
            WOMEN'S DAY{' '}
            <br />
            FLOWER - TELLING{' '}
          </h1>
          <p className="text-2xl font-bold">
            ✨Press & Bloom: Discover Your Flower, Embrace Your Power!✨
          </p>
        </div>
        <div
          className="flex w-full flex-col items-center justify-start space-y-4 !mt-[48px]"
        >
          {isSet ? (
            <div
              className="flex flex-col items-center justify-center space-y-6 text-white"
            >
              <div className="flex w-full items-start justify-center">
                <p className="text-2xl">
                  Hi<span className="font-bold">{' '}{name}</span>
                </p>
              </div>
              <p
                className="text-xl !mt-2"
              >You are a <strong><i>Mountain Laurel</i></strong></p>
              <OverlappingImages
                image1={{
                  src: '/flowers/mountain laurel 1.jpg', // Replace with your image path
                  alt: 'Mountain landscape',
                }}
                image2={{
                  src: '/flowers/mountain laurel 2.jpg', // Replace with your image path
                  alt: 'Mountain cliff',
                }}
                quote={{
                  title: 'This is the flower of ambition and unwavering spirit.',
                  description: 'Mountain Laurel thrives on rocky cliffs, never letting harsh conditions stop it from reaching for the sky.',
                  caption: 'You are a force of nature, always pushing forward, never settling, always reaching higher. Your determination inspires those around you, proving that no mountain is too high to climb.',
                  wish: 'Wish you endless mountains to conquer, victories to celebrate, and the strength to rise higher with every challenge.',
                }}
              />
              <Card className="bg-white rounded-xl shadow-lg w-[600px] !mt-10">
                <CardHeader className="font-bold text-xl text-center">We have surprise for you!!!</CardHeader>
                <div className="w-full flex justify-center items-center">
                  <CardContent
                    className="flex flex-col items-center justify-center space-y-4 px-6 pb-6 bg-white rounded-xl"
                  >
                    <GiftBox />
                  </CardContent>
                </div>
              </Card>
            </div>
          ) : (
            <NameDialog />
          )}
        </div>
      </div>
    </div>
  )
}
