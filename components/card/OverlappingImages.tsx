'use client'

import React, { useState } from 'react'
import Image from 'next/image'

interface OverlappingImagesProps {
  image1: {
    src: string;
    alt: string;
  };
  image2: {
    src: string;
    alt: string;
  };
  quote: {
    title: string;
    description: string;
    caption: string;
    wish: string;
  };
}

const OverlappingImages: React.FC<OverlappingImagesProps> = ({
                                                               image1,
                                                               image2,
                                                               quote,
                                                             }) => {
  const [isImage2Active, setIsImage2Active] = useState(false)

  const toggleImage = () => {
    setIsImage2Active(!isImage2Active)
  }

  return (
    <div className="bg-white rounded-xl shadow-lg p-6 h-[670px]">
      <div className="flex flex-col md:flex-row items-center gap-8 p-4 max-w-4xl mx-auto">
        <div className="relative w-full md:w-1/2 h-96">
          {/* First image */}
          <div
            className={`absolute transition-transform duration-300 ease-in-out w-4/5 h-4/5 ${
              isImage2Active
                ? 'translate-x-4 translate-y-4 z-10'
                : 'z-20'
            }`}
            style={{
              top: '0',
              left: '0',
            }}
          >
            <Image
              src={image1.src}
              alt={image1.alt}
              width={350}
              height={500}
              className="object-cover cursor-pointer !w-auto !h-auto rounded-lg"
              onClick={toggleImage}
              onMouseEnter={() => setIsImage2Active(false)}
            />
          </div>

          {/* Second image */}
          <div
            className={`absolute transition-transform duration-300 ease-in-out w-4/5 h-4/5 ${
              isImage2Active
                ? 'z-20'
                : 'translate-x-4 translate-y-4 z-10'
            }`}
            style={{
              bottom: '0',
              right: '0',
            }}
          >
            <Image
              src={image2.src}
              alt={image2.alt}
              width={350}
              height={500}
              className="object-cover cursor-pointer !w-auto !h-auto rounded-lg"
              onClick={toggleImage}
              onMouseEnter={() => setIsImage2Active(true)}
            />
          </div>
        </div>

        <div className="w-full md:w-1/2 space-y-4 px-4">
          <div className="flex items-center gap-2">
            <span className="text-yellow-500 text-2xl">⚠️</span>
            <p className="font-medium">{quote.title}</p>
          </div>

          <div className="flex items-center gap-2">
            <span className="text-yellow-500 text-2xl">👍</span>
            <p>{quote.description}</p>
          </div>

          <div className="flex items-start gap-2">
            <span className="text-red-500 text-2xl">🎯</span>
            <p>{quote.caption}</p>
          </div>

          <div className="flex items-start gap-2">
            <span className="text-yellow-300 text-2xl">✨</span>
            <p>{quote.wish}</p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default OverlappingImages