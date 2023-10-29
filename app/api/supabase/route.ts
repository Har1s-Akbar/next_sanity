import { client } from "@/app/lib/sanity";
import { NextApiRequest, NextApiResponse } from "next";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
    
    try{
        const res = await req.json()
        const id = res.id
        const crude = client.patch(id).set({inSupabase: true}).commit()
        const data = await crude.then((result)=> {return result})
        return NextResponse.json(
            {message: data},
            {status : 200}
            )
    }catch(err){
        NextResponse.json({message: err})
    }
}