import React from 'react'
import { client } from '../lib/sanity'
import { TopPicks } from '../components/TopPicks'
import { TopPicksType } from '../lib/interface'

async function fetchToppicks(){
    const query = `*[_type == "toppicks"]{
        ...,
        "posts": post[]->{
            ...,
            categories[]->,
            author->
        }
    } | order(_updatedAt asc)`
    const data = await client.fetch(query)

    return data
}

async function Page() {
  const data = await fetchToppicks() as TopPicksType[]
    return (
        <main>
            <TopPicks data={data}/>
        </main>
  )
}

export default Page