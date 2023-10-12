'use client'
import Image from "next/image"
import clientSupabase from "../lib/supabaseConfig"

function PostFunctions({data}:{data: any}) {

    const AddSupabase = async()=>{
        if(data.inSupabase){
            console.log('already added')
        }else{

            const data = await fetch('/api/supabase', {
                method: "GET",
            })
                // const {error} = await clientSupabase.from('posts').insert({post_id: data._id})
                // console.log(error)
                // if(error){
                //     console.log('there is an error')
                // }else{

                // }
        }
    }

  return (
    <div className="flex items-center justify-between w-1/2 mx-auto">
    <button onClick={AddSupabase} className="flex items-start justify-center">
      <h1 className="text-slate-800 mx-2">0</h1>
      <Image src="https://img.icons8.com/fluency-systems-regular/48/facebook-like--v1.png" alt="facebook-like--v1" width={21} height={21}/>
    </button>
    <div className="flex items-start justify-center">
      <h1 className="text-slate-800 mx-2">0</h1>
      <Image src="https://img.icons8.com/quill/50/comments--v1.png" alt="comments--v1" width={21} height={21}/>
    </div>
    <div className="flex items-start justify-center">
      <Image src="https://img.icons8.com/sf-regular-filled/48/share.png" alt="share" width={21} height={21}/>
    </div>
  </div>
  )
}

export default PostFunctions