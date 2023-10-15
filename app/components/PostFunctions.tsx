'use client'

import { useState } from "react"
import Image from "next/image"
import clientSupabase from "../lib/supabaseConfig"
import { useMemo } from "react"
import { useRouter } from "next/navigation"

function PostFunctions({data}:{data: any}) {
  const id = data._id
  const [likes, setLikes] = useState([])
  const router = useRouter()
  const {pathname} = useRouter()

  const AddSupabase = async()=>{
    const postsData = (await clientSupabase.from('posts').select().eq('post_id', id)).data
    if(!!postsData){
      setLikes([])
    }else if(postsData[0].likes === null){
      setLikes([])
    }else{
      setLikes(postsData[0].likes)
    }
    // console.log(pos)
    if(data.inSupabase){
      console.log('already added')
    }else{
      const sanityTrueChange = await fetch(process.env.NEXT_PUBLIC_URL + '/api/supabase',{
        method: 'POST',
        body: JSON.stringify({id}),
        headers: {
          'Content-Type': 'application/json',
        }
      }).then(async(result) => {
        if(result.status === 200){
          const {data , error} = await clientSupabase.from('posts').insert({post_id: id}).select()
          if(!!error){
            AddSupabase();
            router.push(pathname)
          }else{
            console.log('added to database and in sanity')
          }
          }
         }).catch((error)=>{
          if(error){
            console.log('error occuered')
          }else{
            console.log('no error occuered')
          }
         })
      }
    }

    useMemo(()=>{AddSupabase()}, [])

    const addLike = async() =>{
      const session = (await clientSupabase.auth.getSession()).data
      const role = session.session?.user.role
      const idUser = session.session?.user.id
      console.log('clicked')
      if(role === 'authenticated'){
        const Exists = (await clientSupabase.from('posts').select('likes').eq('post_id', id).contains('likes',[idUser])).data
        console.log(Exists)
        // const {data, error} = await clientSupabase.from('posts').update({likes: [idUser]}).eq('post_id', id).select()
        // if(!!data){
        //   setLikes([])
        //   console.log('likes not')
        // }else if(data[0].likes === null){
        //   setLikes([])
        //   console.log('added')
        // }else{
        //   setLikes(data[0].likes)
        // }
      }else{
        console.log('not authenticated')
      }
    }

  return (
    <div className="flex items-center justify-between w-1/2 mx-auto">
    <button
    onClick={addLike}
    className="flex items-start justify-center">
      <h1 className="text-slate-800 mx-2">{likes.length}</h1>
      <Image src="https://img.icons8.com/ios/50/1A1A1A/facebook-like--v1.png" alt="facebook-like--v1" width={21} height={21}/>
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