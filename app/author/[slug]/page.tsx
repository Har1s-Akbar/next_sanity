import { AuthorData } from '@/app/lib/interface'
import { client } from '@/app/lib/sanity'
import { PortableText } from '@portabletext/react'
import { ExclamationTriangleIcon } from '@radix-ui/react-icons'
import {
  Alert,
  AlertDescription,
  AlertTitle,
} from "@/components/ui/alert"
import { urlFor } from '@/app/lib/sanityImageUrl'
import Image from 'next/image'
import BlogList from '@/app/components/BlogList'
import { Separator } from '@/components/ui/separator'
import { Premium } from '@/app/components/Premium'
import Tags from '@/app/components/Tags'

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
    console.log(data.posts.length)
  return (
    <main className='flex'>
      <section className='flex items-center flex-col w-9/12 mx-auto'>
        <div className='flex flex-col items-center justify-center'>
              <Image src={urlFor(data.image).width(300).height(300).url()} alt={data.name} width={130} height={130} className='rounded-full'/>    
              <h1 className='text-2xl font-medium mt-2'>{data.name}</h1>
              <p className='text-sm underline decoration-red-300 decoration-wavy underline-offset-4 opacity-70 font-light '>Author</p>
              <div className='my-2'>
                  <PortableText value={data.bio}/>
              </div>
          </div>
          <Separator className='w-9/12 my-3'/>
          <div className=''>
            {data.posts.length === 0 ? <div className='w-[30rem]'>
            <Alert className='my-10'>
              <ExclamationTriangleIcon className="h-4 w-4" />
              <AlertTitle>No Posts</AlertTitle>
              <AlertDescription>
                This author has not posted anything yet!!!
              </AlertDescription>

            </Alert>
            </div> :
              <div>
                <h1 className='text-3xl font-semibold my-2 w-10/12 m-auto'>Posts from Author</h1>    
                <BlogList data={data.posts}/>
              </div>
            }
          </div>
      </section>
      <Separator className='w-0.5 mx-10 opacity-70 min-h-screen'/>
      <section className="w-5/12 flex flex-col items-center sticky top-0">
          <Premium/>
          <Tags/>
      </section>
    </main>
  )
}

export default page