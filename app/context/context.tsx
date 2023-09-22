'use client'

import React, { Dispatch, ReactNode, SetStateAction, createContext, useContext, useEffect, useState } from "react";
import { Tag } from "../lib/interface";
import { client } from "../lib/sanity";
import { provider,auth } from "../lib/firebaseConfig";
import { signInWithPopup } from "firebase/auth";

interface Props {
    children: ReactNode;
}

interface contextProps {
    tag : Tag[];
    setTag : Dispatch<SetStateAction<Tag[]>>;
    user: any
    setUser: Dispatch<SetStateAction<any>>,
    getUser():any
}


const GlobalContext = createContext<contextProps>({
    tag:[],
    user:[],
    setTag:(): Tag[]=>[],
    setUser:()=>{},
    getUser:()=> {}
})


export const GlobalContextProvider = ({children}: Props)=>{
    const [tag, setTag] = useState<[]|Tag[]>([])
    const [user, setUser] = useState<[]|any>()
    async function getTag() {
        const query = `*[_type == "category"]`;
        const data = await client.fetch(query);
        setTag(data)
    }
    useEffect(()=> {getTag()},[])

    const getUser = () =>{
        signInWithPopup(auth,provider).then((result)=>{
            const signedUser = result.user
            setUser(signedUser)
            // console.log(signedUser)
        }).catch((error)=>{
            console.log(error)
        })
    }

    return(
        <GlobalContext.Provider value={{tag, setTag, setUser, user, getUser}}>
            {children}
        </GlobalContext.Provider>    
    )
}

export const useGlobalContext = ()=> useContext(GlobalContext)