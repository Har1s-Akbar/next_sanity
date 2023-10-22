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
import clientSupabase from '@/app/lib/supabaseConfig'
import { v4 as uuidv4, v4 } from "uuid";

export default function Login() {
  const router = useRouter()
  const supabase = createClientComponentClient()
  const [file, setfile] = useState<File | []>([])
  const formSchema = z.object({
    name: z.string().max(15,{
        message:"can not be of more tha 15 characters"
    }).min(4,{
      message:'should be of more than 4 letters'
    }),
    username:z.string().toLowerCase().max(8,{
        message: "username should be in small case and maximum of 8 characters"
    }).min(3,{
      message:'should be of more than 3 letters'
    }),
    image: z.any()
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
    // console.log(!file)
    if(!!file){
      const filename = `${v4()}-${values.image}`
      const {data, error} = await clientSupabase.auth.getSession()
      const id = data.session?.user.id
      if(data.session){
        const updateAvatar = async() =>{
          const {data, error} = await clientSupabase.storage.from('profiles').upload('public/'+ file.name, file as File)
          updateData(data?.path)
        }
        const updateData = async(path: any) =>{
          const {error, data} = await clientSupabase.from('profiles').update({full_name : values.name, username : values.username, avatar_url : path}).eq('id', id).select()
          router.push('/')
        }
        updateAvatar()
      }else{
        console.log('no session found')
      }
    }else{
      alert('Image is empty!!!')
    }
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
                        <Input type='file' id='picture' onChange={(e)=>{setfile(e.target.files[0])}} />
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