import React from 'react'
import { urlFor } from '@/app/lib/sanityImageUrl';
import { TagPost } from '@/app/lib/interface';
import { Post } from '@/app/lib/interface';
import { client } from '@/app/lib/sanity';
import { Badge, badgeVariants } from '@/components/ui/badge';
import BlogList from '@/app/components/BlogList';

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
    <main>
        <div className='flex items-center justify-center'>
            <h1 className='text-3xl my-3 '>Blogs which are related to</h1>
            <Badge className='py-2 px-6 mx-4'>{data.title}</Badge>
        </div>
        <BlogList data={data.posts}/>
    </main>
  )
}

export default page