import { Separator } from "@/components/ui/separator";
import { Post, TopPicksType } from "../lib/interface";
import BlogList from "./BlogList";
import { urlFor } from "../lib/sanityImageUrl";
import Image from "next/image";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import Link from "next/link";

export function TopPicks({data}:{data:TopPicksType[]}) {
  return (
    <main>
        <div className="">
            <h1 className="text-3xl font-semibold">Top Picks of This Week</h1>
            <p className="text-base my-2 font-light opacity-80">The stories that are noteworthy</p>
        </div>
        <Separator className="my-5"/>
            <div className="grid md:grid-cols-3 lg:grid-cols-4 gap-3">{data.map((top, index)=>{
                return <div key={index} className="flex flex-col items-center">
                    <div className="flex flex-col items-start justify-center">
                        <div className="flex items-center">
                            <p className="mx-2 text-xl">{index + 1})</p>
                            <h1 className="text-2xl font-semibold">{top.title}</h1>
                        </div>
                        {/* <p className="indent-8 opacity-90 my-2">{top.description}</p> */}
                    </div>
                    <div className="">
                        {top.posts.map((post : any)=>{
                            return <Link key={post.slug.current} href={`/post/${post.slug.current}`}>
                            <div className="my-2 relative group">
                                <div className="">    
                                 <Image src={urlFor(post.mainImage).width(400).height(800).url()} className="rounded-lg hover:brightness-75 ease-in-out delay-75 duration-75 w-full h-auto" alt={post.title} width="0" height="0" sizes="100vw"/>
                                </div>
                                <div className="w-full bg-zinc-600 opacity-80 group-hover:opacity-90 delay-75 duration-75 absolute top-5 py-5">
                                    <h1 className="font-semibold px-2 w-11/12">{post.title}</h1>
                                </div>
                                <div className="absolute flex items-center bottom-2 left-2">
                                    <Avatar className=''>
                                        <AvatarImage src={urlFor(post.author.image).width(300).height(300).url()} />
                                        <AvatarFallback>{post.author.name}</AvatarFallback>
                                    </Avatar>
                                    <h1 className="mx-2 font-semibold">{post.author.name}</h1>
                                </div>
                            </div>
                            </Link> 
                        })}
                    </div>
                </div>
            })}
        </div>
    </main>
  )
}