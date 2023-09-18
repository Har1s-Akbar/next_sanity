import { Author } from "../lib/interface"
import { urlFor } from "../lib/sanityImageUrl"
import { Avatar, AvatarFallback,AvatarImage } from "@/components/ui/avatar"

function Author({data}: {data: Author[]}) {
    console.log(data)
    return (
    <main className="mt-5 flex items-center flex-col">
        <h1 className="text-3xl fonr-semibold my-2">Authors</h1>
        <div>
            {data.map((item)=>{
                return <div className="flex my-2 items-center justify-center">
                <Avatar className=''>
                    <AvatarImage src={urlFor(item.image).width(300).height(300).url()} />
                    <AvatarFallback>{item.name}</AvatarFallback>
                </Avatar>
                <p className="text-lg font-medium underline decoration-rose-950 mx-2">{item.name}</p>
                {/* <p className="text-sm mx-2 opacity-80 italic">{new Date(item._createdAt).toDateString()}</p> */}
                </div>
            })}
        </div>
    </main>
  )
}

export default Author