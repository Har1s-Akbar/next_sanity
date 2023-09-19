import { AuthorData } from '@/app/lib/interface'
import { client } from '@/app/lib/sanity'
import { PortableText } from '@portabletext/react'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { urlFor } from '@/app/lib/sanityImageUrl'
import Image from 'next/image'
import BlogList from '@/app/components/BlogList'
import { Separator } from '@/components/ui/separator'

async function getAuthorData(slug : string){
    const query = `*[_type == "author" && slug.current == "${slug}"]{
        ...,
        "posts" : *[_type == "post" && references(^._id)]{
          
          ...,
          categories[]->,
          author->
        }
      }[0]`
      const data = await client.fetch(query)

      return data
}

async function page({params}:{params : {slug : string}}) {
    const data = await getAuthorData(params.slug) as AuthorData
    console.log(data)
  return (
    <main className='flex items-center flex-col w-10/12 m-auto'>
        <div className='flex flex-col items-center justify-center'>
            <Image src={urlFor(data.image).width(300).height(300).url()} alt={data.name} width={130} height={130} className='rounded-full'/>    
            <h1 className='text-3xl font-medium mt-2'>{data.name}</h1>
            <p className='text-sm underline decoration-red-300 decoration-wavy underline-offset-4 opacity-70 font-light '>Author</p>
            <div className='my-2'>
                <PortableText value={data.bio}/>
            </div>
        </div>
            <Separator className='w-9/12 my-3'/>
        <div>

        </div>
        <div>
            <h1 className='text-3xl font-semibold my-2 w-10/12 m-auto'>Posts from Author</h1>    
            <BlogList data={data.posts}/>
        </div>
    </main>
  )
}

export default page