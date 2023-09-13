import { Post } from "@/app/lib/interface";
import { client } from "@/app/lib/sanity";
import { urlFor } from "@/app/lib/sanityImageUrl";
import PortableText from "react-portable-text";
import Image from "next/image";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Separator } from "@/components/ui/separator";
import { PortableTextComponent } from "@/app/components/RichText";

async function getData(slug: string) {
  const query = `*[_type == "post" && slug.current == "${slug}"][0]{
    ...,
    categories[]->,
    author->
  }`;

  const data = await client.fetch(query);

  return data;
}

export default async function SlugPage({
  params,
}: {
  params: { slug: string };
}) {
  const data = (await getData(params.slug)) as Post;

  return (
    <div className="xl:divide-y xl:divide-gray-200 xl:dark:divide-gray-700">
      <div>
        <div className="flex items-center ml-20 justify-center">
          <div className="w-1/2 hover:ease-in-out hover:duration-300 hover:delay-150 hover:border-r-8 hover:border-b-8 hover:p-5 border-white rounded-lg">
          <Image src={urlFor(data.mainImage).url()} alt={data.title} width={600} height={500} className="rounded-lg drop-shadow-2xl w-full"/>
          </div>
          <div className="m-auto ml-20 w-1/2">
            <h1 className="text-3xl font-extrabold leading-9 tracking-tight text-gray-900 dark:text-gray-100 sm:text-4xl sm:leading-10 md:text-5xl md:leading-14">
              {data.title}
            </h1>
            <p className="text-sm font-medium opacity-90 w-7/12 my-5 leading-relaxed break-normal align-middle subpixel-antialiased tracking-wide">{data.description}</p>
            <Separator className="w-1/2 my-5"/>
            <div className="flex items-center">
              <Avatar className='w-14 h-14'>
                  <AvatarImage src={urlFor(data.author.image).url()} />
                  <AvatarFallback>{data.author.name}</AvatarFallback>
              </Avatar>
              <div className="mx-3">
              <h1 className="text-2xl font-semibold tracking-wide">{data.author.name}</h1>
              {/* <Separator className="my-2"/> */}
              <p className="opacity-70 text-sm">Author</p>
              </div>
            </div>
          </div>
        </div>
        <Separator className="my-10 w-10/12 mx-auto"/>
        <div>
        <div className="prose max-w-none w-7/12 m-auto pb-8 pt-10 dark:prose-invert prose-lg">
            <PortableText
            projectId="2hdzu35m"
            dataset="production"
              content={data.body}
              serializers={PortableTextComponent}
            />
        </div>
        </div>
      </div>
      {/* <header className="pt-6 xl:pb-6">
      <Image src={urlFor(data.mainImage).url()} width={600} alt={data.title} height={1000} className="rounded-lg my-3 drop-shadow"/>
        <div className="space-y-1 text-center">
          <div className="space-y-10">
            <div>
              <p className="text-base font-medium leading-6 text-teal-500">
                {new Date(data._createdAt).toISOString().split("T")[0]}
              </p>
            </div>
          </div>

          <div>
            <h1 className="text-3xl font-extrabold leading-9 tracking-tight text-gray-900 dark:text-gray-100 sm:text-4xl sm:leading-10 md:text-5xl md:leading-14">
              {data.title}
            </h1>
          </div>
        </div>
      </header>

      <div className="divide-y divide-gray-200 pb-7 dark:divide-gray-700 xl:divide-y-0">
        <div className="divide-y divide-gray-200 dark:divide-gray-700 xl:col-span-3 xl:row-span-2 xl:pb-0">
          <div className="prose max-w-none pb-8 pt-10 dark:prose-invert prose-lg">
            <PortableText
              value={data.body}
              components={PortableTextComponent}
            />
          </div>
        </div>
      </div> */}
    </div>
  );
}
