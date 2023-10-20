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
  // console.log(likes.length)
  const AddSupabase = async()=>{
    if(data.inSupabase){
    }else{
      const sanityTrueChange = await fetch(process.env.NEXT_PUBLIC_URL + '/api/supabase',{
            method: 'POST',
            body: JSON.stringify({id}),
            headers: {
              'Content-Type': 'application/json',
            }
          }).then(async(result) => {
            const existPost = (await clientSupabase.from('posts').select().eq('post_id', id)).data
            const existComment = (await clientSupabase.from('comments').select().eq('post_id', id)).data
            // console.log(!!existPost.length && !!existComment.length)
            if(!!existComment.length && !!existPost.length){
              if(!!existPost.likes){
                setLikes(existPost.likes)
              }else{
                setLikes([])
              }
            }else{
              const postAdded = (await clientSupabase.from('posts').insert({post_id: id}).select()).data
              const commentAdded = (await clientSupabase.from('comments').insert({post_id: id}).select()).data
            }
          })
        }
    }
    useMemo(()=>{AddSupabase()}, [])

    const addLike = async() =>{
      const session = (await clientSupabase.auth.getSession()).data
      const role = session.session?.user.role
      const idUser = session.session?.user.id
      if(role === 'authenticated'){
        const Exists = (await clientSupabase.from('posts').select('likes').eq('post_id', id).contains('likes',[idUser])).data
        if(Exists.length === 0){
          const {data, error} = await clientSupabase.from('posts').update({likes: [idUser]}).eq('post_id', id).select()
          if(!!data){
            setLikes(data[0].likes)
          }else if(data[0].likes === null){
            setLikes([])
          }else{
            setLikes([])
          }
        }else{
          const {data, error} = await clientSupabase.rpc('remove_user_likes',{post_id_input: id, user_id: idUser} )
          if(!!data){
            setLikes(data[0].likes)
          }else if(data[0].likes === null){
            setLikes([])
          }else{
            setLikes([])
          }
        }
      }else{
        console.log('not authenticated')
      }
    }

  return (
  <div className="flex items-center justify-between w-1/2 mx-auto">
    <button
    onClick={addLike}
    className="flex items-start justify-center">
      <h1 className="text-slate-800 mx-2">{
        likes !== null ? <p>{likes.length}</p> : <p>0</p>
      }</h1>
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