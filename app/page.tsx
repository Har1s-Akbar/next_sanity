import { client } from "./lib/sanity";
import { Separator } from "@/components/ui/separator";
import { Premium } from "./components/Premium";
import Tags from "./components/Tags";

export const revalidate = 60

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
      <main className="flex w-full">
        <div className="flex flex-col w-9/12 m-auto items-center">
          <h1 className="text-4xl mb-7">Blogs</h1>
          <BlogList data={data}/>
        </div>
        <Separator className='w-0.5 mx-10 opacity-70 min-h-screen'/>
            <div className="w-4/12 flex flex-col items-center sticky top-0">
              <Premium/>
              <Tags data={tag}/>
            </div>
      </main>
  );
}
