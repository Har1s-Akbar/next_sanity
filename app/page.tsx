import Link from "next/link";
import { Post } from "./lib/interface";
import { Premium } from "./components/Premium";
import Tags from "./components/Tags";
import { client } from "./lib/sanity";
import { Separator } from "@/components/ui/separator";

export const revalidate = 30

import BlogList from "./components/BlogList";
async function getData() {
  const query = `*[_type == "post"]{
    ...,
    categories[]->,
    author->
  }`;

  const data = await client.fetch(query);

  return data;
}
async function getTag() {
  const query = `*[_type == "category"]`;

  const data = await client.fetch(query);

  return data;
}

export default async function IndexPage() {
  const data = (await getData());
  const tag = await getTag()
  return (
    <main className="flex justify-between relative">
        <BlogList data={data}/>
        <Separator className='w-0.5 mx-10 opacity-70 min-h-screen'/>
      <div className="w-4/12 flex flex-col items-center sticky top-0">
        <Premium/>
        <Tags data={tag}/>
      </div>
    </main>
  );
}
