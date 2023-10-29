'use client'

import clientSupabase from "../lib/supabaseConfig";
import React, { Dispatch, ReactNode, SetStateAction, createContext, useCallback, useContext, useEffect, useState } from "react";
import { ProfileType, Tag, profileArray, sessionType, userType, profilepathType } from "../lib/interface";
import { client } from "../lib/sanity";
import { useRouter } from "next/navigation";


interface Props {
    children: ReactNode;
}

interface contextProps {
    profilePath: profilepathType,
    isAuth: boolean;
    getsession: ()=>void;
    setAuth: Dispatch<SetStateAction<boolean>>;
    profile: profileArray[];
    setProfile: Dispatch<SetStateAction<ProfileType[]>>;
    setSession: Dispatch<SetStateAction<sessionType[]>>;
    session:sessionType;
    signOut: Dispatch<SetStateAction<{}>>
}


const GlobalContext = createContext<contextProps>({
    getsession:()=>{},
    signOut:()=>{},
    profilePath: null,
    setSession:()=>{},
    session:null,
    isAuth: false,
    setAuth:()=>{},
    profile: [],
    setProfile:()=>{},
})

export const GlobalContextProvider = ({children}: Props)=>{
    const [isAuth, setAuth] = useState<false | boolean>(false)
    const [profile, setProfile] = useState([])
    const [profilePath, setProfilePath] = useState(null)
    const [session, setSession] = useState(null)
    const router = useRouter()
    const getsession = useCallback(async()=>{
        const {data, error} = await clientSupabase.auth.getSession()
        if(!!data.session){
            setSession(data.session)
            const user = data.session as sessionType
            const profileData = (await clientSupabase.from('profiles').select().eq('id', data.session.user.id)).data
            if(!!profileData){
                const profilePicture = profileData[0].avatar_url
                if(!!profilePicture){
                    setProfile(profileData)
                    const { data } = clientSupabase
                    .storage
                    .from('profiles')
                    .getPublicUrl(profilePicture)
                    setProfilePath(data)
                    setAuth(true)
                    // router.push('/')
                }else{
                    setAuth(false)
                    console.log('this is running session')
                    router.push(`/profile/${data.session.access_token}`)
                }
            }
        }else{
            setSession(null)
            setAuth(false)
        }
    },[isAuth])

    useEffect(()=>{getsession()}, [getsession])

    async function signOut(){
        const {error} = await clientSupabase.auth.signOut()
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
        <GlobalContext.Provider value={{profile, setSession,setProfile,isAuth, setAuth, getsession, session, profilePath, signOut}}>
            {children}
        </GlobalContext.Provider>    
    )
}

export const useGlobalContext = ()=> useContext(GlobalContext)