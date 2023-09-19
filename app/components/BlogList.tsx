import Link from 'next/link'
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { urlFor } from '../lib/sanityImageUrl'
import Image from 'next/image'
import { Post} from '../lib/interface'


function BlogList({data}:{data : Post[]}) {
    return (
        <main className='flex items-center flex-col justify-center'>
            {/* <h1 className='text-3xl font-semibold'>Blogs</h1> */}
            <div className='flex flex-col items-center'>
            {data.map((item)=>{
            // return <h1>{item.slug.current}</h1>
            return <Card className='my-5 w-10/12'>
                  <Link href={`/post/${item.slug.current}`}>
              <div className='flex items-center w-full'>
                <CardHeader className=''>
                    <div className="flex my-2 items-center">
                    <Avatar className='w-5 h-5'>
                    <AvatarImage src={urlFor(item.author.image).width(300).height(300).url()} />
                    <AvatarFallback>{item.author.name}</AvatarFallback>
                    </Avatar>
                    <p className="text-sm mx-2">{item.author.name}</p>
                    <p className="text-sm mx-2 opacity-80 italic">{new Date(item.publishedAt).toDateString()}</p>
                    </div>
                    <div className='w-11/12'>
                        <CardTitle className='text-2xl'>{item.title}</CardTitle>
                        <CardDescription className='truncate ... my-2'>{item.description}</CardDescription>
                    </div>
                </CardHeader>
                <CardContent>
                    <Image src={urlFor(item.mainImage).url()} width={200} alt={item.title} height={200} className="rounded-lg my-3 drop-shadow"/>
                </CardContent>
              </div>
            </Link>
              <CardFooter>
              {item.categories.map((item)=>{
                return <Link href={`/tags/${item.slug.current}`}>
                          <Badge key={item._id} className='mx-3'>{item.title}</Badge>
                      </Link>
                })}
              </CardFooter>
            </Card>
          })}
            </div>
        </main>
    )
}

export default BlogList