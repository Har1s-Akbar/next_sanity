'use client'

import React, { Dispatch, ReactNode, SetStateAction, createContext, useContext, useEffect, useState } from "react";
import { Tag } from "../lib/interface";
import { client } from "../lib/sanity";

interface Props {
    children: ReactNode;
}

interface contextProps {
    tag : Tag[];
    page: number;
    setTag : Dispatch<SetStateAction<Tag[]>>;
    setPage: Dispatch<SetStateAction<number>>;
}


const GlobalContext = createContext<contextProps>({
    tag:[],
    page:10,
    setTag:(): Tag[]=>[],
    setPage:()=>{},
})


export const GlobalContextProvider = ({children}: Props)=>{
    const [tag, setTag] = useState<[]|Tag[]>([])
    const [page, setpage] =useState<10|number>(10)

    async function getTag() {
        const query = `*[_type == "category"]`;
        const data = await client.fetch(query);
        setTag(data)
    }
    useEffect(()=> {getTag()},[])

    const setPage = () =>{
        setpage((prev)=> prev + 5)
    }
    // const decrementPage = () =>{
    //     setPage((prev)=> prev - 5)
    // }

    return(
        <GlobalContext.Provider value={{tag, setTag, page, setPage}}>
            {children}
        </GlobalContext.Provider>    
    )
}

export const useGlobalContext = ()=> useContext(GlobalContext)