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

  const onSubmit = (values: z.infer<typeof formSchema>) =>{
    console.log(values)
  }
  
  const handleSignUp = async () => {
    await supabase.auth.signUp({
      email,
      password,
      options: {
        emailRedirectTo: `${location.origin}/auth/callback`,
      },
    })
    router.refresh()
  }


//   const handleSignIn = async () => {
//     await supabase.auth.signInWithOtp({
//       email,
//       options:{
//         emailRedirectTo: `${location.origin}/`
//       }
//     })
//     router.refresh()
//   }

//   const handleSignOut = async () => {
//     await supabase.auth.signOut()
//     router.refresh()
//   }

  return (
    <main className='flex flex-col w-full justify-center items-center'>
        <h1 className='text-3xl font-semibold'>Sign Up</h1>
        <Separator className='w-1/3 my-7'/>
        {/* <h1 className='text-3xl my-5 font-semibold'>Sign Up</h1>
        <div className="grid w-full max-w-sm items-center gap-1.5">
            <Label htmlFor="email">Email</Label>
            <Input type="email" id="email" placeholder="Email" onChange={(e) => setEmail(e.target.value)} value={email}/>
        </div>
        <div className="grid w-full max-w-sm items-center gap-1.5 my-5">
            <Label htmlFor="password">Password</Label>
            <Input 
            type="password"
            name="password"
            onChange={(e) => setPassword(e.target.value)}
            value={password}
            />
        </div>
        <Button onClick={handleSignUp}>Sign up</Button> */}
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
                        <Input placeholder="password" {...field} />
                    </FormControl>
                    </FormItem>
                )}
                />
                <Button type="submit" className='w-full'>Submit</Button>
            </form>
        </Form>
        <Link href='/sign' className='my-4 text-blue-300'>Already have an account?</Link>
    </main>
  )
}