import { client } from "@/app/lib/sanity";

export async function POST() {
    client.patch(id).set({_type:'boolean', inSupabase:true})
}