'use client'

import { useState } from "react"
import Image from "next/image"
import clientSupabase from "../lib/supabaseConfig"
import { useMemo } from "react"
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip"
import { useGlobalContext } from "../context/context"
import Link from "next/link"

function PostFunctions({data}: any) {
  const {isAuth, profile} = useGlobalContext()
  const id = data._id
  const [likes, setLikes] = useState([])

  const AddSupabase = async()=>{
    if(data.inSupabase){
      const likesData = (await clientSupabase.from('posts').select().eq('post_id',id)).data
      setLikes(likesData[0].likes)
    }else{
      const sanityTrueChange = await fetch(process.env.NEXT_PUBLIC_URL + '/api/supabase',{
            method: 'POST',
            body: JSON.stringify({id}),
            headers: {
              'Content-Type': 'application/json',
            }
          }).then(async(result) => {
            const existPost : any = (await clientSupabase.from('posts').select().eq('post_id', id)).data
            if(!!existPost.length){
              if(!!existPost.likes){
                setLikes(existPost.likes)
              }else{
                setLikes([])
              }
            }else{
              const postAdded = (await clientSupabase.from('posts').insert({post_id: id}).select()).data
            }
          })
        }
    }
    useMemo(()=>{AddSupabase()}, [])
    const addLike = async() =>{
    const Id = profile[0].id
    const Exists = (await clientSupabase.from('posts').select('likes').eq('post_id', id).contains('likes',[Id])).data
    if(Exists.length === 0){
        const {data, error} = await clientSupabase.rpc('append_user_likes', {post_id_input:id,user_id:Id})
        if(!!data){
          setLikes(data[0].likes)
        }else if(data[0].likes === null){
          setLikes([])
        }else{
          setLikes([])
        }
      }else{
        const {data, error} = await clientSupabase.rpc('remove_user_likes',{post_id_input: id, user_id: Id} )
        if(!!data){
          setLikes(data[0].likes)
        }else if(data[0].likes === null){
            setLikes([])
        }else{
          setLikes([])
        }
      }
    }

  return (
  <div className="flex items-center justify-between w-11/12 md:w-1/2 mx-auto">
    {isAuth ?
    <button
    onClick={addLike}
    className="flex items-start justify-center">
      <h1 className="text-slate-800 mx-2">{
        likes !== null ? <p>{likes.length}</p> : <p>0</p>
      }</h1>
      <Image src="https://img.icons8.com/ios/50/1A1A1A/facebook-like--v1.png" alt="facebook-like--v1" width={21} height={21}/>
    </button>
    :
    <TooltipProvider>
        <Tooltip>
          <TooltipTrigger asChild>
            <button 
              className="flex items-start justify-center">
            <h1 className="text-slate-800 mx-2">{
              likes !== null ? <p>{likes.length}</p> : <p>0</p>
            }</h1>
            <Image src="https://img.icons8.com/ios/50/1A1A1A/facebook-like--v1.png" alt="facebook-like--v1" width={21} height={21}/>
            </button>
          </TooltipTrigger>
          <TooltipContent className="my-3">
            <p>You need to sign In first</p>
          </TooltipContent>
        </Tooltip>
      </TooltipProvider>
  }
    <div className="flex items-start justify-center">
      {/* <h1 className="text-slate-800 mx-2">0</h1> */}
      <Link href='#comments'>
      <Image src="https://img.icons8.com/quill/50/comments--v1.png" alt="comments--v1" width={21} height={21}/>
      </Link>
    </div>
    <div className="flex items-start justify-center">
      <Image src="https://img.icons8.com/sf-regular-filled/48/share.png" alt="share" width={21} height={21}/>
    </div>
  </div>
  )
}

export default PostFunctions