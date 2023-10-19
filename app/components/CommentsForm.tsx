'use client'
import { useState } from "react"
import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Textarea } from "@/components/ui/textarea"
import clientSupabase from "../lib/supabaseConfig"

export default function CommentsForm({data}:{data: any}) {
  const [comment, setComment] = useState(null);
  const addComment = async() =>{
    const postId = data._id
    const isAuthenticated = (await clientSupabase.auth.getSession()).data
    const userId = isAuthenticated.session.user.id
    // console.log(isAuthenticated)
    if(!!isAuthenticated){
      console.log(postId)
      const {data, error} = await clientSupabase.from('comments').insert({post_id: postId, profile_id:userId, comments:[{comment}]})
      console.log(data)
    }else{
      console.log('is not auth')
    }
  }

  return (
    <Card className="w-7/12 m-auto">
      <CardHeader>
        <CardTitle>Comment</CardTitle>
        <CardDescription>Want to share your thoughts? Make a comment.</CardDescription>
      </CardHeader>
      <CardContent>
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
      <CardFooter className="flex items-center justify-center">
        <Button variant="outline" className="w-7/12" onClick={addComment}>Add</Button>
      </CardFooter>
    </Card>
  )
}
