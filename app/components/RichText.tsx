import Image from "next/image";
import { urlFor } from "../lib/sanityImageUrl";


export const PortableTextComponent = {
    //   image: ({ value }:any ) => (
    //     // <Image
    //     //   src={value}
    //     //   alt={value}
    //     //   className="rounded-lg m-auto my-5"
    //     //   width={500}
    //     //   height={500}
    //     // />
    //     <img src={urlFor(value).url()} alt="" />
    //   ),
      // Ex. 1: customizing common block types
      h1: ({children}:any) => (<h1 className="text-5xl my-5 font-semibold">{children}</h1>),
      h2: ({children}:any) => (<h2 className="text-4xl my-5">{children}</h2>),
      h3: ({children}:any) => (<h3 className="text3xl my-5">{children}</h3>),
      h4: ({children}:any) => (<h4 className="text-2xl my-5">{children}</h4>),
      blockquote: ({children}:any) => (<blockquote className="border-l-yellow-700 border-l-4 pl-5 my-10">{children}</blockquote>),
      normal: ({children}: any)=>(<p className="my-7 leadong-5 subpixel-antialiased tracking-wide">{children}</p>),
        // Ex. 1: customizing common list types
        bullet: ({children}: any) => <li className="my-10" style={{listStyleType: 'disclosure-closed'}}>{children}</li>,
    
        // Ex. 2: rendering custom list items
        checkmarks: ({children}:any) => <li>✅ {children}</li>,
  };