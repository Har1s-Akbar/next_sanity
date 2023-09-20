import { Separator } from "@/components/ui/separator";
import { Post, TopPicksType } from "../lib/interface";
import BlogList from "./BlogList";

export function TopPicks({data}:{data:TopPicksType[]}) {
    console.log(data.map((item)=>{ return item.posts}))
  return (
    <main>
        <div className="">
            <h1 className="text-3xl font-semibold">Top Picks of This Week</h1>
            <p className="text-base my-2 font-light opacity-80">The stories that are noteworthy</p>
        </div>
        <Separator className="my-5"/>
        <div>
            <div>{data.map((top, index)=>{
                return <div>
                    <div className="flex flex-col items-start justify-center">
                        <div className="flex items-center">
                            <p className="mx-2 text-xl">{index + 1})</p>
                            <h1 className="text-2xl font-semibold">{top.title}</h1>
                        </div>
                        <p className="indent-8 opacity-90 my-2">{top.description}</p>
                    </div>
                    <div className="w-1/2">
                        <BlogList data={top.posts}/>
                    </div>
                </div>
            })}</div>
        </div>
    </main>
  )
}