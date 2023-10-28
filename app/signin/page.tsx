'use client'

import { Separator } from "@/components/ui/separator"
import {
  Form,
  FormControl,
  FormDescription,
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
      password: z.string().min(4,{
        message:'password should be more than 4 characters'
      })
    })

    const form = useForm<z.infer<typeof formSchema>>({
      resolver: zodResolver(formSchema),
      defaultValues: {
        email: "",
        password:""
      },
    })

    const onSubmit = async(values: z.infer<typeof formSchema>)=> {
      setloading(true)
      const {data, error} = await clientSupabase.auth.signInWithPassword({
        email: values.email,
        password: values.password
      })
      if(!!data.user){
        getsession()
        setloading(false)
        setAuth(false)
        router.push('/')
      }else{
        setloading(false)
        seterrorMsg(error.message)
        setshowerror(true)
      }
      }

  return (
    <main className='md:w-1/2 w-11/12 mx-auto'>
        <div className="flex flex-col items-center justify-center">
          <h1 className='text-2xl my-3 font-semibold text-center'>Sign In</h1>
          <p className="text-sm font-thin opacity-80 my-2">Sign In to your already created account</p>
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
              <FormField
                control={form.control}
                name="password"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Password</FormLabel>
                    <FormControl>
                      <Input placeholder="your password" type="password" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              {
                loading?
              <Button className="w-full" disabled>
              <ReloadIcon className="mr-2 h-4 w-4 animate-spin"/>
                Signing In
              </Button>
              :
              <Button type="submit" className="w-full">
                Sign In
              </Button>

              }
            </form>
          </Form>
          </div>
          <div className="flex flex-col items-center justify-center my-4">
            <Link href='/reset' className="opacity-70 text-xs text-green-300 my-2 text-center underline decoration-green-300">
              Forgot Your Password?
            </Link>
            <Link href='/signup' className="opacity-70 text-xs text-green-300 my-2 text-center underline decoration-green-300">
              {`Don't have an account? Sign Up`}
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