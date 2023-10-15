import Image from "next/image";
import { urlFor } from "../lib/sanityImageUrl";
import Link from "next/link";

export const PortableTextComponent = {
  types:{
    image: ({ value }:any ) => (
      <div className="my-5 flex items-center flex-col justify-center">
        <Image
        sizes="50vw"
          src={urlFor(value).width(1000).height(500).url()}
          alt={'photo'}
          className="rounded-lg m-auto my-2 drop-shadow-2xl"
          width={0}
          style={{width:'auto', height:"auto"}}
          height={0}
        />
        <p className="opacity-80 text-xs">{value.caption}</p>
      </div>
        ),
      },
      block:{
      h1: ({children}:any) => (<h1 className="text-5xl my-5 font-semibold">{children}</h1>),
      h2: ({children}:any) => (<h2 className="text-4xl my-5 font-semibold">{children}</h2>),
      h3: ({children}:any) => (<h3 className="text-3xl my-5 font-medium">{children}</h3>),
      h4: ({children}:any) => (<h4 className="text-2xl my-5">{children}</h4>),
      blockquote: ({children}:any) => (<blockquote className="border-l-yellow-700 italic border-l-4 pl-5 my-10">{children}</blockquote>),
      normal:({children}:any) =>(<p className="leading-7 tracking-normal">{children}</p>)
      },
      marks: {
        link: ({value, children}:any) => {
          const target = (value?.href || '').startsWith('http') ? '_blank' : undefined
          return (
            <Link href={value?.href} className="underline-offset-4 underline decoration-orange-400 italic hover:decoration-red-700 transition ease-in-out delay-75" target={target}>
              {children}
            </Link>
          )
        },
      },
      list: {
        // Ex. 1: customizing common list types
        bullet: ({children}:any) => <ul className="ml-10 mt-xl my-5 leading-5 break-words tracking-wide list-disc">{children}</ul>,
        number: ({children}:any) => <ol className="mt-lg list-decimal">{children}</ol>,
    
        // Ex. 2: rendering custom lists
        checkmarks: ({children}:any) => <ol className="m-auto text-lg">{children}</ol>,
      },
  };