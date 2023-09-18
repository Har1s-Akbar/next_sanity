import React from 'react'
import { urlFor } from '@/app/lib/sanityImageUrl';
import { TagPost } from '@/app/lib/interface';
import { client } from '@/app/lib/sanity';
import { Badge, badgeVariants } from '@/components/ui/badge';
import BlogList from '@/app/components/Cover';
import { Separator } from '@/components/ui/separator';
import { Premium } from '@/app/components/Premium';
import Tags from '@/app/components/Tags';

async function getData(slug: string){
    const query = `*[_type == "category" && slug.current == "${slug}"]{
        ...,
        "posts": *[_type == "post" && references(^._id)]{
            ...,
            categories[]->,
            author->
        }
      }[0]`
    const data = await client.fetch(query)

    return data
}

async function page({
    params,
  }: {
    params: { slug: string };
  }) {
    const data = await getData(params.slug) as TagPost
    console.log(data)
  return (
      <main className="flex w-full justify-center">
        <div className='flex flex-col w-7/12 items-center mx-auto'>
          <div className='flex items-center justify-center'>
              <h1 className='text-3xl my-3 mx-5'>Blogs which are related to</h1>
              <Badge className='py-2 px-8 mx-4'>{data.title}</Badge>
          </div>
          <BlogList data={data.posts}/>
        </div>
        <Separator className='w-0.5 mx-10 opacity-70 min-h-screen'/>
            <div className="w-4/12 flex flex-col items-center sticky top-0">
              <Premium/>
              <Tags/>
            </div>
      </main>
  )
}

export default page