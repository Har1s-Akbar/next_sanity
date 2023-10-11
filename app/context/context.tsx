'use client'

import clientSupabase from "../lib/supabaseConfig";
import React, { Dispatch, ReactNode, SetStateAction, createContext, useContext, useMemo, useState } from "react";
import { Tag } from "../lib/interface";
import { client } from "../lib/sanity";
import { useRouter } from "next/navigation";

interface Props {
    children: ReactNode;
}

interface contextProps {
    tag : Tag[];
    setTag : Dispatch<SetStateAction<Tag[]>>;
    isAuth: boolean;
    setAuth: Dispatch<SetStateAction<boolean>>;
    profile: [];
    setProfile: Dispatch<SetStateAction<[]>>;
}


const GlobalContext = createContext<contextProps>({
    tag:[],
    setTag:(): Tag[]=>[],
    isAuth: false,
    setAuth:()=>{},
    profile: [],
    setProfile:()=>{},
})

export const GlobalContextProvider = ({children}: Props)=>{
    const [tag, setTag] = useState<[]|Tag[]>([])
    const [isAuth, setAuth] = useState<false | boolean>(false)
    const [profile, setProfile] = useState<[] | any>([])
    const router = useRouter()
    
    useMemo(()=> 
    async function getTag() {
        const query = `*[_type == "category"]`;
        const data = await client.fetch(query);
        setTag(data)
    }
    ,[])

    useMemo(()=>    async function getProfile(){
        const {data, error} = await clientSupabase.auth.getSession()
        if(data.session){
            const Data = data
            clientSupabase.auth.onAuthStateChange(async(event, Session)=>{
                const id = Data.session.user.id
                const {data, error} = await clientSupabase.from('profiles').select().eq('id', id)
                if(data.avatar_url == null){
                    router.push(`/profile/${Session?.access_token}`)
                }else{
                    router.push('/')
                }
            })
            setAuth(true)
            console.log(isAuth)
        }else{
            setAuth(false)
        }
    },[isAuth])

    return(
        <GlobalContext.Provider value={{tag, setTag, profile, setProfile,isAuth, setAuth}}>
            {children}
        </GlobalContext.Provider>    
    )
}

export const useGlobalContext = ()=> useContext(GlobalContext)