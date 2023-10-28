"use client"

import {motion} from 'framer-motion'
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
import { Cross1Icon, EnvelopeClosedIcon, HamburgerMenuIcon, HomeIcon, TriangleUpIcon } from '@radix-ui/react-icons'

function MobileNav() {
  const parentAnimate = {start:{
    opacity:1
  },
  end:{
    opacity:0
  }
}
const childAnimate={
  start:{
    opacity:0,
    y:200    
},
    end:{
        opacity:1,
        y:0,
        transition:{type:'spring', bounce:0.2, ease:'linear', stiffness:50, velocity:1, mass:0.5}
    }
}
    const router = useRouter()
    const [isOpen, setOpen] = useState(false)
  const {profile, profilePath, isAuth, signOut, getsession} = useGlobalContext()
  useEffect(()=> {getsession()},[isAuth])


  return (
    <main className='w-11/12 py-4 mx-auto md:hidden'>
      <section className='flex items-center justify-between m-auto'>
        <div className='w-full'>
          <h1 className='text-xl font-semibold opacity-60 text-foreground w-1/4 subpixel-antialiased'>Text & Texture</h1>
        </div>
        <div className=''>
          <Button variant='ghost' className={isOpen ? 'hidden':'block'} onClick={()=>{setOpen(!isOpen)}}>
            <HamburgerMenuIcon/>
          </Button>
          <motion.div variants={parentAnimate} className={isOpen ? 'flex flex-col items-start absolute z-10 bg-zinc-950 rounded w-44 top-0 right-0 h-96' : 'hidden'}>
            <div>
              <Button variant='ghost' onClick={()=> setOpen(false)}>
                <Cross1Icon/>
              </Button>
              <Separator className='w-60'/>
            </div>
          <div className='flex w-7/12 my-5 items-center justify-center'>
              {isAuth ? 
              profile.map((item : any)=>{
                return  <HoverCard key={item.id}>
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
                        Sign Out
                    </Button>
                  </div>
                </HoverCardContent>
              </HoverCard>
              })
              :
            <div className='flex justify-between items-center w-full ml-3 m-auto'>
              <button className='text-foreground py-2 px-3 hover:bg-foreground border-2 delay-200 duration-200 hover:text-secondary rounded-lg bg-secondary'>
                <Link href='/signin'>
                  Sign in
                </Link>
              </button>
            </div>}
          </div>
            <Link href='/'>
              <Button variant='ghost'>
                <HomeIcon/>
                <p className='mx-2'>
                  Home
                </p>
              </Button>
            </Link>
            <Link href='/top'>
              <Button variant='ghost'>
                <TriangleUpIcon/>
                <p className='mx-2'>
                  Top Picks
                </p>
              </Button>
            </Link>
            <Link href='/'>
              <Button variant='ghost'>
                <EnvelopeClosedIcon/>
                <p className='mx-2'>
                  Contact
                </p>
              </Button>
            </Link>
            <Button variant='ghost'>
              <Themebutton/>
              <p className='mx-2'>
                Theme
              </p>
            </Button>
          </motion.div>
        </div>
      </section>
    </main>
  )
}

export default MobileNav