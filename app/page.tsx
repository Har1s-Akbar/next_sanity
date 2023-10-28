import { client } from "./lib/sanity";

export const revalidate = 0

import Cover from "./components/Cover";
import BlogHome from "./components/BlogHome";


async function fetchAuthor(){
  const query = `*[_type == "author"]`
  const data = await client.fetch(query)

  return data
}


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
  const author = await fetchAuthor()
  
  return (
      <main className="flex w-full flex-col justify-center">
        <div className="flex flex-col items-center mx-auto">
          <Cover data={data}/>
        </div>
        <div>
            <div className="w-full flex flex-col items-center">
              <BlogHome data={{data, author}}/>
            </div>
        </div>
      </main>
  );
}