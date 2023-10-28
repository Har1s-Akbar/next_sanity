'use client'

import { Separator } from "@/components/ui/separator"
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"

import { Input } from "@/components/ui/input"
import { useForm } from "react-hook-form"
import {ReloadIcon} from '@radix-ui/react-icons'
import React, { useState } from 'react'
import clientSupabase from '../lib/supabaseConfig'
import { useGlobalContext } from '../context/context'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import Image from 'next/image'
import { Button } from '@/components/ui/button'
import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod"

function Page() {
  const router = useRouter()
  const [errorMsg, seterrorMsg] = useState('')
  const [showerror, setshowerror] = useState(false)
  const [loading, setloading] = useState(false)
  const {setAuth, getsession} = useGlobalContext()
    const formSchema = z.object({
      email: z.string().min(5, {
        message: "invalid mail. Only accepts gmail",
      }).email(),
    })

    const form = useForm<z.infer<typeof formSchema>>({
      resolver: zodResolver(formSchema),
      defaultValues: {
        email: ""
      },
    })

    const onSubmit = async(values: z.infer<typeof formSchema>)=> {
      seterrorMsg('Working on this feature')
      setshowerror(true)
      // setloading(true)
      // const {data, error} = await clientSupabase.auth.signInWithPassword({
      //   email: values.email,
      //   password: values.password
      // })
      // if(!!data.user){
      //   getsession()
      //   setloading(false)
      //   setAuth(false)
      //   router.push('/')
      // }else{
      //   setloading(false)
      //   seterrorMsg(error.message)
      //   setshowerror(true)
      // }
      }

  return (
    <main className='md:w-1/2 mx-auto'>
        <div className="flex flex-col items-center justify-center">
          <h1 className="text-2xl my-3 font-semibold text-center">Reset Password</h1>
          <p className="text-sm font-thin opacity-80 my-2">Reset your account's password</p>
        </div>
      <Separator className="my-3"/>
      <section>
        <div className='w-full'>
          <button className='w-full drop-shadow-lg my-5 bg-zinc-800 py-1.5 rounded-lg m-auto'>
            <Link href='/'>
              <Image src="https://img.icons8.com/fluency/48/google-logo.png" className='mx-auto' alt="google-logo" width={30} height={30}/>
            </Link>
          </button>
          <div>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Email</FormLabel>
                    <FormControl>
                      <Input placeholder="youremail@gmail.com" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              {
                loading?
              <Button className="w-full" disabled>
              <ReloadIcon className="mr-2 h-4 w-4 animate-spin"/>
                Sending..
              </Button>
              :
              <Button type="submit" className="w-full">
                Reset Password
              </Button>
              }
            </form>
          </Form>
          </div>
          <div className="flex flex-col items-center justify-center my-4">
            <Link href='/signin' className="opacity-70 text-xs text-green-300 my-2 text-center underline decoration-green-300">
            Already have an account? sign in
            </Link>
            <Link href='/signup' className="opacity-70 text-xs text-green-300 my-2 text-center underline decoration-green-300">
              Don't have an account? Sign Up
            </Link>
          </div>
        </div>
        {showerror &&
        <p className="opacity-70 text-xs text-white my-2 text-center underline decoration-green-300">{errorMsg}</p>  
      }
      </section>
    </main>
  )
}

export default Page