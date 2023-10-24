'use client'

import clientSupabase from "../lib/supabaseConfig";
import React, { Dispatch, ReactNode, SetStateAction, createContext, useContext, useEffect, useState } from "react";
import { Tag } from "../lib/interface";
import { client } from "../lib/sanity";
import { useRouter } from "next/navigation";

interface Props {
    children: ReactNode;
}

interface contextProps {
    tag : Tag[];
    profilePath:{},
    setTag : Dispatch<SetStateAction<Tag[]>>;
    isAuth: boolean;
    setAuth: Dispatch<SetStateAction<boolean>>;
    profile: [];
    setProfile: Dispatch<SetStateAction<[]>>;
    setSession: Dispatch<SetStateAction<string>>;
    session:{};
    signOut: Dispatch<SetStateAction<{}>>
}


const GlobalContext = createContext<contextProps>({
    tag:[],
    signOut:()=>{},
    profilePath:{},
    setSession:()=>{},
    session:null,
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
    const [profilePath, setProfilePath] = useState(null)
    const [session, setSession] = useState(null)
    const router = useRouter()
    
    async function getTag() {
        const query = `*[_type == "category"]`;
        const data = await client.fetch(query);
        setTag(data)
    }
    
    useEffect(()=> {getTag()},[])
    
    async function getsession(){
        const {data, error} = await clientSupabase.auth.getSession()
        // console.log()
        if(!!data.session){
            setSession(data.session)
            const profileData = (await clientSupabase.from('profiles').select().eq('id', data.session.user.id)).data
            if(!!profileData){
                const profilePicture = profileData[0].avatar_url
                // console.log(!!profileData[0].avatar_url)
                if(!!profilePicture){
                    setProfile(profileData)
                    const { data } = clientSupabase
                    .storage
                    .from('profiles')
                    .getPublicUrl(profilePicture)
                    setProfilePath(data)
                    setAuth(true)
                }else{
                    setAuth(false)
                    router.push(`/profile/${data.session.access_token}`)
                }

            }
        }else{
            setSession(null)
            setAuth(false)
        }
    }

    useEffect(()=>{getsession()}, [isAuth])

    async function signOut(){
        const {error} = await clientSupabase.auth.signOut()
        console.log(!!error)
        console.log(error)
        if(!error){
            setAuth(false)
            setSession(null)
            setProfile(null)
        }else{
            setAuth(false)
            setSession(null)
            setProfile(null)
        }
    }

    return(
        <GlobalContext.Provider value={{tag, setTag, profile, setProfile,isAuth, setAuth, setSession, session, profilePath, signOut}}>
            {children}
        </GlobalContext.Provider>    
    )
}

export const useGlobalContext = ()=> useContext(GlobalContext)