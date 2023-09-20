"use client"

import React from 'react'
import { Separator } from '@/components/ui/separator'
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


function Nav() {
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
              {/* <NavigationMenuItem >
                <NavigationMenuTrigger className='hover:bg-secondary bg-transparent mx-2 transition duration-300 delay-300 ease-in-out py-2 px-3 rounded'>
                  Blogs
                </NavigationMenuTrigger>
                  <NavigationMenuContent>
                    <ul className="grid gap-5 lg:grid-cols-1 p-4 md:w-[400px] lg:grid-cols-[.75fr_1fr]">
                      <li className='w-full'>
                        <NavigationMenuLink asChild className='w-full rounded-lg'>
                          <Link href='/' className='flex w-full flex-col items-start justify-center mb-2 hover:bg-secondary rounded-lg transition duration-200 delay-200 p-2'>
                            <h1 className='mb-2 mt-4 text-lg font-normal'>By Tags</h1>
                            <p className='text-sm leading-tight text-muted-foreground'>See blogs relating to a specific tag</p>
                          </Link>
                        </NavigationMenuLink>
                        <Separator/>                    
                      </li>
                      <li className='w-full'>
                        <NavigationMenuLink asChild className='w-full'>
                          <Link href='/' className='flex w-full flex-col items-start justify-center mb-2 hover:bg-secondary rounded-lg transition duration-200 delay-200 p-2'>
                            <h1 className='mb-2 mt-4 text-lg font-normal'>By Authors</h1>
                            <p className='text-sm leading-tight text-muted-foreground'>see the blogs published by authors</p>
                          </Link>
                        </NavigationMenuLink>
                        <Separator/>                        
                      </li>
                      <li className='w-full'>
                        <NavigationMenuLink asChild className='w-full'>
                          <Link href='/' className='flex w-full flex-col items-start justify-center mb-2 hover:bg-secondary rounded-lg transition duration-200 delay-200 p-2'>
                            <h1 className='mb-2 mt-4 text-lg font-normal'>All</h1>
                            <p className='text-sm leading-tight text-muted-foreground'>See All the blogs</p>
                          </Link>
                        </NavigationMenuLink>
                        <Separator/>                        
                      </li>
                    </ul>
                  </NavigationMenuContent>
              </NavigationMenuItem> */}
              
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
      <div className='flex justify-between items-center w-7/12 m-auto'>
        <button className='bg-foreground py-2 px-3 hover:bg-secondary border-2 delay-200 duration-200 hover:text-foreground rounded-lg text-secondary'>
          <Link href='/'>
          Sign Up
          </Link>
        </button>
        <button className='text-foreground py-2 px-3 hover:bg-foreground border-2 delay-200 duration-200 hover:text-secondary rounded-lg bg-secondary'>
          <Link href='/'>
          Sign in
          </Link>
        </button>
        <Themebutton/>
      </div>
    </main>
  )
}

export default Nav