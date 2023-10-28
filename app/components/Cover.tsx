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

function Cover({data}:{data: Post[]}) {
  return (
    <main className='mx-auto'>
      <div className="flex flex-col items-center">
        <div>
          <div className='relative group'>
            <Link href={`/post/${data[0].slug.current}`}>
            <Image className='rounded-lg group-hover:brightness-75 lg:hidden block ease-in-out delay-150 duration-150' priority={true} src={urlFor(data[0].mainImage).width(2000).height(2500).url()} alt={data[0].title} height={2000} width={2000}/>
            <Image className='rounded-lg group-hover:brightness-75 ease-in-out hidden lg:block delay-150 duration-150' priority={true} src={urlFor(data[0].mainImage).width(2000).height(700).url()} alt={data[0].title} height={2000} width={2000}/>
            </Link>
            <div className='absolute md:inset-y-40 bottom-10 px-2 md:p-6 rounded-r-lg group-hover:opacity-90 ease-in-out delay-75 duration-75 opacity-75 bg-zinc-600'>
              <div className='mb-3 md:flex items-center hidden justify-between'>
                <div className=' flex items-center'>
                  <Avatar>
                      <AvatarImage src={urlFor(data[0].author.image).width(400).height(400).url()} />
                      <AvatarFallback>{data[0].author.name}</AvatarFallback>
                  </Avatar>
                  <p className="text-sm mx-2 font-semibold text-white">{data[0].author.name}</p>
                  <p className="md:text-sm text-xs mx-2 opacity-80 text-white italic">{new Date(data[0].publishedAt).toDateString()}</p>
                </div>
                <p className="text-sm mx-2 text-sky-300 animate-pulse font-semibold italic">Latest</p>
              </div>
                <h1 className='font-bold text-left text-white text-xl md:text-4xl my-2'>{data[0].title}</h1>
                {data[0].categories.map((item)=>{
                  return <Link href={`/tags/${item.slug.current}`}>
                            <Badge key={item._id} className='mr-3 my-2'>{item.title}</Badge>
                      </Link>
                  })}
            </div>
          </div>
        </div>
      </div>
    </main>
  )
}

export default Cover