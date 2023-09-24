'use client'

import { createClientComponentClient } from '@supabase/auth-helpers-nextjs'
import { useRouter } from 'next/navigation'
import { useState } from 'react'
import * as z from "zod"
import { zodResolver } from "@hookform/resolvers/zod"
import { Button } from "@/components/ui/button"
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
import { useForm } from 'react-hook-form'
import { Separator } from '@/components/ui/separator'
import Link from 'next/link'

export default function Login() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const router = useRouter()
  const supabase = createClientComponentClient()

  const formSchema = z.object({
    email: z.string().includes('@gmail.com',{
        message:"invalid gmail"
    }),
    password: z.string().min(8,{
        message:"password can not be shorter than 8 charcters"
    })
  })
    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues:{
            email:"",
            password:""
        }
    })

  const onSubmit = async(values: z.infer<typeof formSchema>) =>{
    // console.log(values.email)
    const email = values.email
    const password = values.password
    await supabase.auth.signUp({
      email,
      password,
      options: {
        emailRedirectTo: `${location.origin}/auth/callback`,
      },
    }).then((data)=>{
      console.log(data)
      // supabase.auth.onAuthStateChange((event, session)=>{
      //   console.log(session)
      // })
    })
    router.refresh()
  }

  return (
    <main className='flex flex-col w-full justify-center items-center'>
        <h1 className='text-3xl font-semibold'>Sign Up</h1>
        <Separator className='w-1/3 my-7'/>
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8 w-1/3">
                <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                    <FormItem>
                    <FormLabel>Email</FormLabel>
                    <FormControl>
                        <Input placeholder="youremail@gmail.com" {...field} />
                    </FormControl>
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
                        <Input type='password' placeholder="password" {...field} />
                    </FormControl>
                    </FormItem>
                )}
                />
                <Button type="submit" className='w-full'>Sign Up</Button>
            </form>
        </Form>
        <Link href='/sign' className='my-4 text-blue-300'>Already have an account?</Link>
    </main>
  )
}