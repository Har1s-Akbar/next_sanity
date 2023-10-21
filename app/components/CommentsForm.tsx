'use client'
import { useState, useMemo, useId } from "react"
import { Button } from "@/components/ui/button"
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

export default function CommentsForm({data}:{data: any}) {
  const [comment, setComment] = useState(null);
  const [commentData, setCommentData] = useState([])
  const [render, setRender] = useState(false)
  const postId = data._id

  const getCommentData = async() =>{
    const {data, error} = await clientSupabase.from('comments').select('comments').eq('post_id', postId)
    // console.log(data[0].comments)
    if(!!data[0].comments){
      setCommentData(data[0].comments)
      setRender(true)
    }else{
      return commentData
    }
  }

  useMemo(()=> getCommentData(), [])

  const addComment = async() =>{
    const isAuthenticated = (await clientSupabase.auth.getSession()).data
    const userId = isAuthenticated.session.user.id
    if(!!isAuthenticated){
      // console.log(userId)
      const userProfile = (await clientSupabase.from('profiles').select().eq('id', userId)).data
      const name = userProfile[0].full_name
      // console.log(!name)
      if(!!name){
        const {data, error} = await clientSupabase.rpc('append_comments', {post_id_input : postId, jsonb_data: {name: name, comment: comment}})
        setRender(true)
        setCommentData(data[0].comments)
      }else{
        console.log('can not add comment')
      }
      // console.log(data)
    }else{
      console.log('is not auth')
    }
  }

  return (
      <Tabs defaultValue="account" className="w-1/2 m-auto">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="add">Add Comment</TabsTrigger>
          <TabsTrigger value="comments">Comments</TabsTrigger>
        </TabsList>
        <TabsContent value="add">
          <Card>
            <CardHeader>
              <CardTitle>Add Comments</CardTitle>
              <CardDescription>
                Tell us what you think about this post!!
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-2">
                <form>
                <div className="grid w-full items-center gap-4">
                  <div className="flex flex-col space-y-1.5 my-4">
                    <Textarea placeholder="Type your message here." id="message-2" onChange={(e)=>{setComment(e.target.value)}}/>
                  <p className="text-sm text-muted-foreground">
                      Your comment will be live once it get's appproved by the team.
                  </p>
                  </div>
                </div>
             </form>
            </CardContent>
            <CardFooter>
              <div className="m-auto">
                <Button onClick={addComment}>Post</Button>
              </div>
            </CardFooter>
          </Card>
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
                  {commentData.map((item)=>{
                    return <Alert className="bg-zinc-900 my-2">
                    <AlertTitle className="text-lg underline">{item.name}</AlertTitle>
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
  )
}
