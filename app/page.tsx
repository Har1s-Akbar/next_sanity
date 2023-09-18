import { client } from "./lib/sanity";
import { Separator } from "@/components/ui/separator";

export const revalidate = 60

import Cover from "./components/Cover";
import BlogHome from "./components/BlogHome";

async function getData() {
  const query = `*[_type == "post"]{
    ...,
    categories[]->,
    author->
  } | order(publishedAt desc)`;

  const data = await client.fetch(query);

  return data;
}

export default async function IndexPage() {
  const data = (await getData());
  return (
      <main className="flex w-full flex-col justify-center">
        <div className="flex flex-col items-center mx-auto">
          <h1 className="text-4xl mb-7 font-bold">Blogs</h1>
          <Cover data={data}/>
        </div>
        {/* <Separator className=" my-5 h-0.5"/> */}
        <div>
            <div className="w-full flex flex-col items-center">
              <BlogHome data={data}/>
            </div>
        </div>
      </main>
  );
}