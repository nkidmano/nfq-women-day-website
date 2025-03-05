import OverlappingImages from '@/components/OverlappingImages'
import { Card, CardContent, CardHeader } from '@/components/ui/card'
import GiftBox from '@/components/GiftBox'
import React from 'react'

export default function GiftContent() {
  return (
    <div className="flex flex-col items-center justify-center space-y-6">
      <OverlappingImages
        image1={{
          src: '/flowers/mountain laurel 1.jpg',
          alt: 'Mountain landscape',
        }}
        image2={{
          src: '/flowers/mountain laurel 2.jpg',
          alt: 'Mountain cliff',
        }}
        quote={{
          title: 'This is the flower of ambition and unwavering spirit.',
          description: 'Mountain Laurel thrives on rocky cliffs, never letting harsh conditions stop it from reaching for the sky.',
          caption: 'You are a force of nature, always pushing forward, never settling, always reaching higher. Your determination inspires those around you, proving that no mountain is too high to climb.',
          wish: 'Wish you endless mountains to conquer, victories to celebrate, and the strength to rise higher with every challenge.',
        }}
      />
      <Card className="border-none bg-white rounded-xl shadow-lg w-[600px] !mt-10">
        <CardHeader className="p-6 font-bold text-[#5d4c73] text-xl text-center">We have a surprise for you!!!</CardHeader>
        <div className="w-full flex justify-center items-center">
          <CardContent className="flex flex-col text-[#5d4c73] items-center justify-center space-y-4 px-6 pb-6 bg-white rounded-xl">
            <GiftBox />
          </CardContent>
        </div>
      </Card>
    </div>
  )
}