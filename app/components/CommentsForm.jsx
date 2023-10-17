'use client'
import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"

export default function CommentsForm() {
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
              <Textarea placeholder="Type your message here." id="message-2" />
            <p className="text-sm text-muted-foreground">
                Your comment will be live once it get's appproved by the team.
            </p>
            </div>
          </div>
        </form>
      </CardContent>
      <CardFooter className="flex items-center justify-center">
        <Button variant="outline" className="w-7/12">Add</Button>
      </CardFooter>
    </Card>
  )
}
