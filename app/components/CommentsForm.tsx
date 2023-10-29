'use client'

import { ReloadIcon } from "@radix-ui/react-icons"
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import * as z from "zod"
import { useState, useMemo, useCallback} from "react"
import { Button } from "@/components/ui/button"
import verified from '../_asset/verified.svg'
import Image from "next/image"
import { ScrollArea } from "@/components/ui/scroll-area"
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/ui/tabs"
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import {
  Alert,
  AlertDescription,
  AlertTitle,
} from "@/components/ui/alert"
import { Textarea } from "@/components/ui/textarea"
import clientSupabase from "../lib/supabaseConfig"
import Link from "next/link"
import { useGlobalContext } from "../context/context"

export default function CommentsForm({data}: any) {
  const {profile, isAuth, session} = useGlobalContext()
  const [commentBtn, setCommentbtn] = useState('');
  const [commentRender, setcmtrender] = useState(false);
  const [commentData, setCommentData] = useState([])
  const [render, setRender] = useState(false)
  const postId = data._id
  const id = data._id

  const formSchema = z.object({
    comments: z.string().min(13, {
      message: "comment must be atleast 14 characters!!",
    }),
  })
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema)
  })

  const getCommentData = useCallback(async()=>{
      const {data, error} = await clientSupabase.from('comments').select(`comment, user_id(full_name)`).eq('post_id', postId)
      // console.log(data)
      if(!!data.length){
        setCommentData(data)
        setRender(true)
      }else{
        setRender(false)
        return commentData
      }
  },[])

  useMemo(()=> {
    getCommentData()
  }, [getCommentData])
  const addComment = async(values: z.infer<typeof formSchema>) =>{
    setCommentbtn('adding')
    setcmtrender(true)
    if(!!session){
      const user_id = session.user.id
      if(!!user_id){
        const {data, error} = await clientSupabase.from('comments').insert({post_id:postId, comment: values.comments, user_id:user_id})
        // console.log(!!data)
        if(!error){
          getCommentData()
          setcmtrender(false)
        }
      }else{
        console.log('can not add comment')
      }
    }else{
      console.log('is not auth')
    }
  }

  return (
    <section>
      <Tabs defaultValue="account" className="md:w-1/2 m-auto">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="add">Add Comment</TabsTrigger>
          <TabsTrigger value="comments">Comments</TabsTrigger>
        </TabsList>
        <TabsContent value="add">
              {isAuth ?
                <Card>
                  <CardHeader>
                    <CardTitle>Add Comments</CardTitle>
                    <CardDescription>
                      Tell us what you think about this post!!
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-2">
                  <Form {...form}>
                    <form onSubmit={form.handleSubmit(addComment)} className="space-y-8">
                      <FormField
                        control={form.control}
                        name="comments"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Comment</FormLabel>
                            <FormControl>
                              <Textarea placeholder="Type your comment here." {...field}/>
                              {/* <Input placeholder="shadcn"  /> */}
                            </FormControl>
                            <FormDescription>
                              Your comments will be public
                            </FormDescription>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      {
                        commentRender ?
                        <Button className="w-full" disabled>
                            <ReloadIcon className="mr-2 h-4 w-4 animate-spin"/>
                              Adding
                        </Button>
                        :
                      <Button type="submit" className="w-full">Submit</Button>
                      }
                    </form>
                  </Form>
                  </CardContent>
                </Card>
             : 
                <Card>
                  <CardHeader>
                    <CardTitle>Add Comments</CardTitle>
                    <CardDescription>
                      Tell us what you think about this post!!
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-2">
                      <div className="flex flex-col items-center justify-center">
                        <Image src={verified} alt="verified" width={250} height={250}/>
                        <div>
                          <p className="text-sm opacity-60">
                            You need to sign In first to add a comment
                          </p>
                        </div>
                      </div>
                  </CardContent>
                  <CardFooter>
                    <div className="m-auto">
                      <Link href='/signin'>
                          <Button>
                            Sign in
                          </Button>
                        </Link>
                    </div>
                  </CardFooter>
                </Card>
            }
        </TabsContent>
        <TabsContent value="comments">
          <Card>
            <CardHeader>
              <CardTitle>Comments</CardTitle>
              <CardDescription>
                Comments Posted by users
              </CardDescription>
            </CardHeader>
            <ScrollArea className="h-72 w-full rounded-md border">
                <CardContent className="space-y-2 my-5">
                  {render?
                  <div>
                  {commentData.map((item, index)=>{
                    return <Alert key={index} className="dark:bg-zinc-900 my-2">
                    <AlertTitle className="text-lg underline">{item.user_id.full_name}</AlertTitle>
                    <AlertDescription>
                      {item.comment}
                    </AlertDescription>
                  </Alert>
                  })}                  
                  </div>
                  :
                  <div>
                    <h1 className="text-zinc-400 text-center">Be the first to add a comment</h1>
                  </div>
                  }
                </CardContent>
              </ScrollArea>
          </Card>
        </TabsContent>
      </Tabs>
    </section>
  )
}
