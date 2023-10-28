"use client"

import {motion} from 'framer-motion'
import { AnimatePresence } from 'framer-motion'
import Image from 'next/image'
import React, { useEffect, useState } from 'react'
import { Button } from '@/components/ui/button'
import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from "@/components/ui/hover-card"
import {
    NavigationMenu,
    NavigationMenuItem,
    NavigationMenuLink,
    NavigationMenuList,
  } from "@/components/ui/navigation-menu"
import Link from 'next/link'
import Themebutton from './ThemeButton'
import { useGlobalContext } from '../context/context'
import { Separator } from '@/components/ui/separator'
import { useRouter } from "next/navigation"
import { Cross1Icon, EnterIcon, EnvelopeClosedIcon, ExitIcon, HamburgerMenuIcon, HomeIcon, TargetIcon, TriangleUpIcon } from '@radix-ui/react-icons'

function MobileNav() {
  const parentAnimate = {start:{
    opacity:1
  },
  end:{
    opacity:1,
    y:0,
    transition:{type:'spring', bounce:0.2, ease:'linear', stiffness:50, velocity:1, mass:0.5}
}
}
const childAnimate={
  start:{
    opacity:0,
    x:200,
    // transition:{type:'spring', bounce:0.2, ease:'linear', stiffness:50, velocity:1, mass:0.5}
  },
  end:{
    opacity:1,
    x:0,
    transition:{type:'spring', bounce:0.2, ease:'linear', stiffness:50, velocity:1, mass:0.5}
  },
  exit:{
      opacity:0,
      x:200,
      transition:{type:'spring', bounce:0.2, ease:'linear', stiffness:50, velocity:1, mass:0.5}
    }
}
    const router = useRouter()
    const [isOpen, setOpen] = useState(false)
  const {profile, profilePath, isAuth, signOut, getsession} = useGlobalContext()
  useEffect(()=> {getsession()},[isAuth, getsession])


  return (
    <main
    className='w-11/12 py-4 mx-auto md:hidden'>
      <section className='flex items-center justify-between m-auto'>
        <div className='w-full'>
          <h1 className='text-xl font-semibold opacity-60 text-foreground w-1/4 subpixel-antialiased'>Text & Texture</h1>
        </div>
        <div className=''>
          <Button variant='ghost' className={isOpen ? 'hidden':'block'} onClick={()=>{setOpen(!isOpen)}}>
            <HamburgerMenuIcon/>
          </Button>
          <AnimatePresence>
          {
            isOpen && 
          <motion.div
          initial='start'
          animate='end'
          exit='exit'
          variants={childAnimate}
          className='flex flex-col drop-shadow-2xl shadow-2xl items-start absolute z-10 bg-white dark:bg-zinc-900 rounded w-44 top-0 right-0 h-96'>
          {/* </AnimatePresence> */}
            <div>
              <Button variant='ghost' onClick={()=> setOpen(false)}>
                <Cross1Icon/>
              </Button>
              <Separator className='w-60'/>
            </div>
          <div className='my-2'>
          <div className='my-2'>
              {isAuth ? 
              profile.map((item : any)=>{
                return <div key={item.id} className='flex w-7/12 my-5 items-center justify-center'>
                <HoverCard>
                <HoverCardTrigger asChild>
                  <Button variant="link" className='drop-shadow-lg'>
                    {profilePath === null ? <span></span>: 
                    <Image src={profilePath.publicUrl} className='rounded-full border-3 w-auto border-yellow-600' alt={item.full_name} width={50} height={50}/>}
                  </Button>
                </HoverCardTrigger>
                <HoverCardContent className="w-44">
                  <div className="flex justify-between flex-col space-x-4 space-y-4">
                    <div className='flex justify-center items-center'>  
                      <Image src={profilePath.publicUrl} className='rounded-full border-3 w-auto border-yellow-600' alt={item.full_name} width={50} height={50}/>
                      <div className="space-y-1 w-32">
                        <div className='flex justify-between items-center flex-col'>
                          <h4 className="text-xs font-semibold">{item.full_name}</h4>
                          <p className='text-xs opacity-60 italic'>@{item.username}</p>
                        </div>
                      </div>
                    </div>
                    <Separator className=' space-y-4 w-28 m-auto'/>
                    <Button onClick={signOut}>
                        <ExitIcon/>
                        <p className='mx-2'>
                          Sign Out
                        </p>
                    </Button>
                  </div>
                </HoverCardContent>
              </HoverCard>
                </div> 
              })
              :
            <div className=''>
              <Link href='/signin'>
              <Button
              variant='ghost'
              // className='text-foreground py-2 px-3 hover:bg-foreground border-2 delay-200 duration-200 hover:text-secondary rounded-lg bg-secondary'
              >
                <EnterIcon/>
                <p className='mx-2'>
                  Sign in
                </p>
              </Button>
                </Link>
            </div>}
          </div>
            <Link href='/' className='my-2'>
              <Button variant='ghost'>
                <HomeIcon/>
                <p className='mx-2'>
                  Home
                </p>
              </Button>
            </Link>
            <Link href='/top' className='my-2'>
              <Button variant='ghost'>
                <TriangleUpIcon/>
                <p className='mx-2'>
                  Top Picks
                </p>
              </Button>
            </Link>
            <Link href='/' className='my-2'>
              <Button variant='ghost'>
                <TargetIcon/>
                <p className='mx-2'>
                  Tags
                </p>
              </Button>
            </Link>
            <Link href='/' className='my-2'>
              <Button variant='ghost'>
                <EnvelopeClosedIcon/>
                <p className='mx-2'>
                  Contact
                </p>
              </Button>
            </Link>
            <Button variant='ghost' className='my-2'>
              <Themebutton/>
              <p className='mx-2'>
                Theme
              </p>
            </Button>
          </div>
          </motion.div>
          }
        </AnimatePresence>
        </div>
      </section>
    </main>
  )
}

export default MobileNav