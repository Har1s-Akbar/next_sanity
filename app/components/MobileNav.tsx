"use client"

import {motion} from 'framer-motion'
import Image from 'next/image'
import React, { useEffect, useMemo, useState } from 'react'
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

const variants = {
    open:{
        opacity:1,
        x:0
    },
    clsed:{
        opacity:0,
        x:20
    }
}

function MobileNav() {
    const router = useRouter()
    const [isOpen, setOpen] = useState(false)
  const {profile, profilePath, isAuth, signOut, getsession} = useGlobalContext()
  // const handleRefresh = () => {
  //   router.refresh()
  // };
  // useEffect(()=>{handleRefresh(),[isAuth]})
  useEffect(()=> {getsession()},[isAuth])


  return (
    <main className='flex w-11/12 py-4 mx-auto items-center justify-between m-auto md:hidden'>
      <div className=''>
        <h1 className='text-xl font-semibold opacity-60 text-foreground w-1/2 subpixel-antialiased'>Text & Texture</h1>
      </div>
      <div className='flex items-center justify-center'>
        {isAuth ? 
            <motion.nav
            initial={false}
            animate={isOpen? "open":"closed"}
            >
                <motion.button className='drop-shadow-lg' onClick={() => setOpen(!isOpen)}>
                {profilePath === null ? <span></span>: 
                <Image src={profilePath.publicUrl} className='rounded-full border-3 w-auto border-yellow-600' alt='profile' width={50} height={50}/>}
                </motion.button>
                <motion.ul
        variants={{
          open: {
            clipPath: "inset(0% 0% 0% 0% round 10px)",
            x:-100,
            transition: {
              type: "spring",
              bounce: 0,
              duration: 0.7,
              delayChildren: 0.3,
              staggerChildren: 0.05
            }
          },
          closed: {
            clipPath: "inset(10% 50% 90% 50% round 10px)",
            transition: {
              type: "spring",
              bounce: 0,
              duration: 0.3
            }
          }
        }}
        style={{ pointerEvents: isOpen ? "auto" : "none" }}
      >
        <motion.li variants={variants}>Item 1 </motion.li>
        <motion.li variants={variants}>Item 2 </motion.li>
        <motion.li variants={variants}>Item 3 </motion.li>
        <motion.li variants={variants}>Item 4 </motion.li>
        <motion.li variants={variants}>Item 5 </motion.li>
      </motion.ul>
          </motion.nav>
        :
        <div className='flex justify-between items-center w-1/3 m-auto'>
          <button className='text-foreground py-2 px-3 hover:bg-foreground border-2 delay-200 duration-200 hover:text-secondary rounded-lg bg-secondary'>
            <Link href='/signin'>
              Sign in
            </Link>
          </button>
        </div>}
      </div>
    </main>
  )
}

export default MobileNav