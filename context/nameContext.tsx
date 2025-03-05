'use client'

import React, { createContext, useContext, useState } from 'react'
import { Person } from '@/types'

interface NameContextProps {
  name: string;
  person: null | Person;
  specialGiftCount: number;
  setPerson: React.Dispatch<React.SetStateAction<null | Person>>;
  setSpecialGiftCount: React.Dispatch<React.SetStateAction<number>>;
}

const nameContext = createContext<NameContextProps | undefined>(undefined)

export const usePerson = () => {
  const context = useContext(nameContext)
  if (!context) {
    throw new Error('useName must be used within a NameProvider')
  }
  return context
}

interface NameProviderProps {
  children: React.ReactNode;
}

export const NameProvider = ({ children }: NameProviderProps) => {
  const [person, setPerson] = useState<null | Person>(null)
  const [specialGiftCount, setSpecialGiftCount] = useState<number>(10)

  const name = person?.email?.split('.')?.[0]?.toUpperCase() ?? ''

  return (
    <nameContext.Provider value={{ name, person, setPerson , specialGiftCount, setSpecialGiftCount }}>
      {children}
    </nameContext.Provider>
  )
}
