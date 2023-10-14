import { client } from "@/app/lib/sanity";
import { NextApiRequest, NextApiResponse } from "next";
import { NextResponse } from "next/server";

// export const config = {
//     api: {
//       bodyParser: true,
//     },
//   }

export async function POST(req: NextApiRequest) {
    
    try{
        const res = await req.json()
        const id = res.id
        client.patch(id).set({inSupabase: true}).commit()
        return NextResponse.json(
            {message: 'Added to Supabase'},
            {status : 200}
            )
    }catch(err){
        NextResponse.json({message: err})
    }
}