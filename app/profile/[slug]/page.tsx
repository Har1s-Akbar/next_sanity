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
    const MAX_FILE_SIZE = 500000;
    const ACCEPTED_IMAGE_TYPES = ["jpeg", "jpg", "png", "webp"];

  const supabase = createClientComponentClient()
  const formSchema = z.object({
    name: z.string().max(15,{
        message:"can not be of more tha 15 characters"
    }),
    username:z.string().toLowerCase().max(8,{
        message: "username should be in small case and maximum of 8 characters"
    }),
    image: z
    .any()
    .refine((files) => files?.[0]?.size <= MAX_FILE_SIZE, `Max image size is 5MB.`)
    .refine(
      (files) => ACCEPTED_IMAGE_TYPES.includes(files?.[0]?.type),
      "Only .jpg, .jpeg, .png and .webp formats are supported."
    )
  })
    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues:{
            name:"",
            username:"",
            image:"",
        }
    })

  const onSubmit = async(values: z.infer<typeof formSchema>) =>{
    console.log(values)
  }

  return (
    <main className='flex flex-col w-full justify-center items-center'>
        <h1 className='text-3xl font-semibold'>Help us set us Your Profile</h1>
        <Separator className='w-1/3 my-7'/>
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8 w-1/3">
                <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                    <FormItem>
                    <FormLabel>Name</FormLabel>
                    <FormControl>
                        <Input placeholder="John Doe" {...field} />
                    </FormControl>
                    </FormItem>
                )}
                />
                <FormField
                control={form.control}
                name="username"
                render={({ field }) => (
                    <FormItem>
                    <FormLabel>username</FormLabel>
                    <FormControl>
                        <Input type='text' placeholder="text" {...field} />
                    </FormControl>
                </FormItem>
                )}
                />
                <FormField
                control={form.control}
                name="image"
                render={({ field }) => (
                    <FormItem>
                    <FormLabel>Image</FormLabel>
                    <FormControl>
                        <Input type='file' id='picture' placeholder="text" {...field} />
                    </FormControl>
                </FormItem>
                )}
                />
                <Button type="submit" className='w-full'>Confirm</Button>
            </form>
        </Form>
    </main>
  )
}