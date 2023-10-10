"use client"

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
    NavigationMenuContent,
    NavigationMenuIndicator,
    NavigationMenuItem,
    NavigationMenuLink,
    NavigationMenuList,
    NavigationMenuTrigger,
    NavigationMenuViewport,
  } from "@/components/ui/navigation-menu"
import Link from 'next/link'
import Themebutton from './ThemeButton'
import { useGlobalContext } from '../context/context'
import clientSupabase from '../lib/supabaseConfig'

function Nav() {
  const {isAuth, setAuth} = useGlobalContext()
  const [user, setUser] = useState([])
  const getUser = async() =>{
    clientSupabase.auth.onAuthStateChange(async(event, Session)=>{
      const id = Session?.user.id
      const {data, error} = await clientSupabase.from('profiles').select().eq('id', id)
      // console.log(data)
    })
  }
  const data = useMemo(()=> {getUser()},[])
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
      <div className='flex w-7/12'>
        {isAuth ? 
          <HoverCard>
          <HoverCardTrigger asChild>
            <Button variant="link">@nextjs</Button>
          </HoverCardTrigger>
          <HoverCardContent className="w-80">
            <div className="flex justify-between space-x-4">
              <Avatar>
                <AvatarImage src="https://github.com/vercel.png" />
                <AvatarFallback>VC</AvatarFallback>
              </Avatar>
              <div className="space-y-1">
                <h4 className="text-sm font-semibold">@nextjs</h4>
                <p className="text-sm">
                  The React Framework – created and maintained by @vercel.
                </p>
              </div>
            </div>
          </HoverCardContent>
        </HoverCard>:
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