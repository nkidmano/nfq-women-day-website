'use client'

import React, { useState } from 'react'
import { useName } from '@/context/nameContext'
import {
  addPerson,
  addTicket,
  checkPerson,
  checkTicketLeft,
  deduceTicket,
} from '@/database/actions'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'

import { Input } from '../ui/input'
import { Button } from '../ui/button'
import { useToast } from '@/hooks/use-toast'

const locations: string[] = ['Ho Chi Minh', 'Da Nang', 'Ha Noi', 'Can Tho']

const NameDialog = () => {
  const [empName, setEmpName] = useState('')
  const { setName, isSet, name, setPerson } = useName()
  const [location, setLocation] = useState('')
  const { toast } = useToast()
  const [isSubmitting, setIsSubmitting] = useState(false)

  function isValidNfqEmail(email: string): boolean {
    const pattern = /^[a-zA-Z0-9._%+-]+@nfq\.com$/
    return pattern.test(email)
  }

  const submitName = async (email: string, location: string) => {
    if (!isValidNfqEmail(email)) {
      toast({
        title: 'Invalid email',
        description: 'Please enter your NFQ email',
        variant: 'destructive',
      })
      return
    }

    if (location == '') {
      toast({
        title: 'Location can\'t be empty',
        description: 'Please select your location',
        variant: 'destructive',
      })
      return
    }

    setIsSubmitting(true)
    const name = email.split('.')[0].toUpperCase()
    email = email.toLowerCase()
    await checkPerson(email)
      .then(async (res) => {
        if (!res) {
          await addPerson(email, location)
          setName(name)
          if (location == 'Ho Chi Minh') {
            const rate = Math.random()
            // get scratch card
            if (0 < rate && rate < 0.7) {
              const amount = Math.floor(Math.random() * 3) + 1
              // check ticket left
              const ticketLeft = await checkTicketLeft(
                `scratch_${amount}`,
              )

              if (ticketLeft > 0) {
                await addTicket(email, amount, 'scratch').then(
                  async (res) => {
                    await deduceTicket(
                      1,
                      `scratch_${amount}`,
                    )
                    setPerson({
                      name: name,
                      ticket: amount,
                      type: 'scratch',
                    })
                  },
                )
              } else {
                setPerson({
                  name: name,
                  ticket: 0,
                  type: 'none',
                })
              }
            }
            // food
            else if (rate >= 0.7) {
              const amount = Math.floor(Math.random() * 2) + 1

              const ticketLeft = await checkTicketLeft(
                `food_${amount}`,
              )

              if (ticketLeft > 0) {
                await addTicket(email, amount, 'food').then(
                  async (res) => {
                    deduceTicket(1, `food_${amount}`)
                    setPerson({
                      name: name,
                      ticket: amount,
                      type: 'food',
                    })
                  },
                )
              } else {
                setPerson({
                  name: name,
                  ticket: 0,
                  type: 'none',
                })
              }
            }

            // none
            else {
              setPerson({ name: name, ticket: 0, type: 'none' })
            }
          } else {
            const rate = Math.random() > 0.7
            if (!rate) {
              const amount = Math.floor(Math.random() * 3) + 1
              const ticketLeft = await checkTicketLeft(
                `scratch_${amount}`,
              )
              if (ticketLeft > 0) {
                await addTicket(email, amount, 'scratch').then(
                  async (res) => {
                    deduceTicket(1, `scratch_${amount}`)
                    setPerson({
                      name: name,
                      ticket: amount,
                      type: 'scratch',
                    })
                  },
                )
              } else {
                setPerson({
                  name: name,
                  ticket: 0,
                  type: 'none',
                })
              }
            } else {
              setPerson({ name: name, ticket: 0, type: 'none' })
            }
          }
        } else {
          toast({
            title: 'Name already exists',
            description: 'Please enter a different name',
            variant: 'destructive',
          })
        }
      })
      .finally(() => {
        setIsSubmitting(false)
      })
  }

  return (
    <div className="w-[500px] flex flex-col space-y-4 justify-center items-center">
      <p className="text-3xl">Enter your NFQ email: </p>
      <div className="w-full mx-auto bg-white rounded-full">
        <Input
          type="text"
          placeholder="example@nfq.com"
          onChange={(e) => setEmpName(e.target.value)}
          className="w-full border-none focus:ring-0 md:text-xl p-6 m-0 shadow-none placeholder:text-gray-400"
        />
      </div>
      <p className="text-3xl">Select location:</p>
      <Select onValueChange={(value) => setLocation(value)}>
        <SelectTrigger className="w-full bg-white p-6 rounded-full text-xl shadow-none">
          <SelectValue placeholder={'Select location'}>
            {location}
          </SelectValue>
        </SelectTrigger>
        <SelectContent>
          {locations.map((loc) => (
            <SelectItem
              value={loc}
              key={loc}
              onClick={() => setLocation(loc)}
              className="text-xl cursor-pointer font-[family-name:var(--font-inter)]"
            >
              {loc}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
      <div className="w-full flex justify-end items-center !mt-8">
        <Button
          onClick={() => {
            submitName(empName, location)
          }}
          disabled={isSubmitting}
          className={`w-full text-xl p-8 rounded-full shadow-none bg-pink-500 hover:bg-pink-600 ${isSubmitting ? 'cursor-not-allowed opacity-70' : ''}`}
        >
          {isSubmitting ? 'Continuing...' : 'Continue'}
        </Button>
      </div>
    </div>
  )
}

export default NameDialog
