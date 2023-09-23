'use client'

import React, { Dispatch, ReactNode, SetStateAction, createContext, useContext, useEffect, useState } from "react";
import { Tag } from "../lib/interface";
import { client } from "../lib/sanity";
interface Props {
    children: ReactNode;
}

interface contextProps {
    tag : Tag[];
    setTag : Dispatch<SetStateAction<Tag[]>>;
}


const GlobalContext = createContext<contextProps>({
    tag:[],
    setTag:(): Tag[]=>[],
})


export const GlobalContextProvider = ({children}: Props)=>{
    const [tag, setTag] = useState<[]|Tag[]>([])
    async function getTag() {
        const query = `*[_type == "category"]`;
        const data = await client.fetch(query);
        setTag(data)
    }
    useEffect(()=> {getTag()},[])

    return(
        <GlobalContext.Provider value={{tag, setTag}}>
            {children}
        </GlobalContext.Provider>    
    )
}

export const useGlobalContext = ()=> useContext(GlobalContext)