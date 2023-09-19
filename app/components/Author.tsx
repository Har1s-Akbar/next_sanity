import { CalendarIcon } from "@radix-ui/react-icons"
import { urlFor } from "../lib/sanityImageUrl"
import { PortableText } from "@portabletext/react";
import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from "@/components/ui/hover-card"
import { Author } from "../lib/interface"

export function Author({data}:{data: Author[]}) {
  return (
    <div className="mt-2 mb-5 flex flex-col items-center w-11/12">
        <h1 className="text-3xl font-semibold my-5">Authors</h1>
        <div className="grid grid-cols-2 gap-x-5 gap-y-2">
        {data.map((item)=>{
            return  <HoverCard>
        <HoverCardTrigger asChild>
            <Button variant="ghost" className="py-5 px-6">
                <div className="flex my-2 items-center justify-center">
                    <Avatar className=''>
                        <AvatarImage src={urlFor(item.image).width(300).height(300).url()} />
                        <AvatarFallback>{item.name}</AvatarFallback>
                    </Avatar>
                    <p className="text-lg font-medium italic hover:border-0 font-medium underline decoration-red-300 decoration-wavy underline-offset-8 mx-2">{item.name}</p>
                </div>
            </Button>
        </HoverCardTrigger>
        <HoverCardContent className="w-full">
            <div className="flex justify-between space-x-4">
            <Avatar>
                <AvatarImage src={urlFor(item.image).width(300).height(300).url()} />
                <AvatarFallback>{item.name}</AvatarFallback>
            </Avatar>
            <div className="space-y-1">
                <div className="flex items-center justify-between w-1/2">    
                    <h4 className="text-sm font-bold">{item.name}</h4>
                    <span>-</span>
                    <p className="text-xs opacity-70 font-normal">Author</p>
                </div>
                <PortableText value={item.bio}/>
                <div className="flex items-center pt-2">
                <CalendarIcon className="mr-2 h-4 w-4 opacity-70" />{" "}
                <span className="text-xs text-muted-foreground">
                    {new Date(item._createdAt).toDateString()}
                </span>
                </div>
            </div>
            </div>
        </HoverCardContent>
        </HoverCard>
        })}
        </div>
    </div>
  )
}
