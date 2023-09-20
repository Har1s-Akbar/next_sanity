import { Post } from "@/app/lib/interface";
import { client } from "@/app/lib/sanity";
import { urlFor } from "@/app/lib/sanityImageUrl";
import { PortableText } from "@portabletext/react";
import Image from "next/image";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Separator } from "@/components/ui/separator";
import { PortableTextComponent } from "@/app/components/RichText";
import Link from "next/link";

export const revalidate = 60

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
                  <AvatarImage src={urlFor(data.author.image).width(200).height(200).url()} />
                  <AvatarFallback>{data.author.name}</AvatarFallback>
              </Avatar>
              <div className="mx-3">
                <Link href={`/author/${data.author.slug.current}`}>
                <h1 className="text-2xl font-semibold tracking-wide">{data.author.name}</h1>
                <p className="opacity-70 text-xs">Author</p>
                </Link>
              </div>
            </div>
          </div>
        </div>
        <Separator className="my-10 w-10/12 mx-auto"/>
        <div>
        <div className="prose max-w-none w-7/12 m-auto pb-8 pt-10 dark:prose-invert prose-lg">
            <PortableText
              value={data.body}
              components={PortableTextComponent}
            />
        </div>
        </div>
      </div>
    </div>
  );
}
