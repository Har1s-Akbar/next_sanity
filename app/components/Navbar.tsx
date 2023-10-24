"use client"

import Image from 'next/image'
import React, { useMemo, useState } from 'react'
import { Button } from '@/components/ui/button'
import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "@/components/ui/avatar"
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
import clientSupabase from '../lib/supabaseConfig'
import { Separator } from '@/components/ui/separator'
import { useRouter } from "next/navigation"

function Nav() {
  const router = useRouter()
  const {profile, profilePath, isAuth, signOut} = useGlobalContext()

  return (
    <main className='grid grid-cols-footer items-center justify-between w-11/12 m-auto mb-10'>
      <div className=' py-5 w-full'>
        <h1 className='text-xl font-semibold opacity-60 text-foreground w-1/4 subpixel-antialiased'>Text & Texture</h1>
      </div>
      <div className='w-full justify-self-center'>
        <NavigationMenu>
          <NavigationMenuList>
              <NavigationMenuItem className='hover:bg-secondary transition duration-300 delay-300 ease-in-out py-2 px-3 rounded'>
                <Link href="/" legacyBehavior passHref>
                  <NavigationMenuLink>
                    Home
                  </NavigationMenuLink>
                </Link>
              </NavigationMenuItem>
              <NavigationMenuItem className='hover:bg-secondary transition duration-300 delay-300 ease-in-out py-2 px-3 rounded'>
                <Link href="/top" legacyBehavior passHref>
                  <NavigationMenuLink>
                    Top Picks
                  </NavigationMenuLink>
                </Link>
              </NavigationMenuItem>
              <NavigationMenuItem className='hover:bg-secondary transition duration-300 delay-300 ease-in-out py-2 px-3 rounded'>
                <Link href="/home" legacyBehavior passHref>
                  <NavigationMenuLink>
                    Contact Us
                  </NavigationMenuLink>
                </Link>
              </NavigationMenuItem>
          </NavigationMenuList>
        </NavigationMenu>    
      </div>
      <div className='flex w-7/12 items-center justify-center'>
        {isAuth ? 
        profile.map((item : any)=>{
          return  <HoverCard key={item.id}>
          <HoverCardTrigger asChild>
            <Button variant="link" className='drop-shadow-lg'>
              {profilePath === null ? <span></span>: 
              <Image src={profilePath.publicUrl} className='rounded-full border-3 mx-5 mr-20 border-yellow-600' alt={item.full_name} width={50} height={50}/>}
            </Button>
          </HoverCardTrigger>
          <HoverCardContent className="w-44">
            <div className="flex justify-between flex-col space-x-4">
              <div className='flex justify-between items-center'>
                <Avatar>
                  <AvatarImage src={profilePath.publicUrl} />
                  <AvatarFallback>{item.full_name}</AvatarFallback>
                </Avatar>
                <div className="space-y-1">
                  <div className='flex justify-between w-5/12 items-center'>
                    <h4 className="text-sm font-semibold">{item.full_name}</h4>
                    <span>-</span>
                    <p className='text-sm opacity-60 italic'>@{item.username}</p>
                  </div>
                </div>
              </div>
              <Separator className='my-2 w-full border-3 border-white mx-auto'/>
              <Button onClick={signOut}>
                  Sign Out
              </Button>
            </div>
          </HoverCardContent>
        </HoverCard>
        })
        :
        <div className='flex justify-between items-center w-1/3 m-auto'>
          <button className='text-foreground py-2 px-3 hover:bg-foreground border-2 delay-200 duration-200 hover:text-secondary rounded-lg bg-secondary'>
            <Link href='/signin'>
              Sign in
            </Link>
          </button>
        </div>}
        <Themebutton/>
      </div>
    </main>
  )
}

export default Nav