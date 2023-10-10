'use client'

import clientSupabase from "../lib/supabaseConfig";
import React, { Dispatch, ReactNode, SetStateAction, createContext, useContext, useMemo, useState } from "react";
import { Tag } from "../lib/interface";
import { client } from "../lib/sanity";
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
    getProfile(id : any):any,
}


const GlobalContext = createContext<contextProps>({
    tag:[],
    setTag:(): Tag[]=>[],
    isAuth: false,
    setAuth:()=>{},
    profile: [],
    setProfile:()=>{},
    getProfile:()=>{},
})


export const GlobalContextProvider = ({children}: Props)=>{
    const [tag, setTag] = useState<[]|Tag[]>([])
    const [isAuth, setAuth] = useState<false | boolean>(false)
    const [profile, setProfile] = useState<[] | any>([])
    async function getTag() {
        const query = `*[_type == "category"]`;
        const data = await client.fetch(query);
        setTag(data)
    }
    useMemo(()=> {getTag()},[])

    async function getProfile(){
        const {data, error} = await clientSupabase.auth.getSession()
        if(data){
            setAuth(true)
        }else{
            setAuth(false)
        }
    }
    useMemo(()=>{getProfile()},[isAuth])

    return(
        <GlobalContext.Provider value={{tag, setTag, profile, setProfile,isAuth, setAuth, getProfile}}>
            {children}
        </GlobalContext.Provider>    
    )
}

export const useGlobalContext = ()=> useContext(GlobalContext)