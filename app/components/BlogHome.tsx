import BlogList from "./BlogList"
import Tags from "./Tags"
import { Premium } from "./Premium"
import { Separator } from "@/components/ui/separator"
import {Author} from "./Author"

function BlogHome({data, author}: any) {
  return (
    <main className="flex w-full py-5 rounded-lg justify-center">
        <div className="flex w-7/12 flex-col items-center mx-auto">
          <h1 className="text-4xl mb-7">Blogs</h1>
          <BlogList data={data.data}/>
        </div>
        <Separator className='w-0.5 mx-10 opacity-70 min-h-screen my-5'/>
          <div className="w-4/12 flex flex-col items-center sticky top-0">
            <Premium/>
            <Tags/>
            {/* <Author/> */}
          <Author data={data.author}/>
          </div>
      </main>
  )
}

export default BlogHome