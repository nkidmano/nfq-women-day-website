'use client'
import React, { createContext, useContext, useEffect, useState } from 'react'
import { Person } from '@/types'

interface NameContextProps {
  name: string;
  setName: (name: string) => void;
  person: Person;
  setPerson: (person: Person) => void;
  isSet: boolean;
}

const nameContext = createContext<NameContextProps | undefined>(undefined)

export const useName = () => {
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
  const [name, setName] = useState<string>('')
  const [person, setPerson] = useState<Person>({
    name: '',
    ticket: 0,
    type: 'none',
  })
  const [isSet, setIsSet] = useState<boolean>(false)

  useEffect(() => {
    if (name) {
      setIsSet(true)
    } else {
      setIsSet(false)
    }
  }, [name])

  return (
    <nameContext.Provider
      value={{ name, setName, isSet, person, setPerson }}
    >
      {children}
    </nameContext.Provider>
  )
}
