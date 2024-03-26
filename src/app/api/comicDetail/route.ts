import { NextResponse } from "next/server";

export const POST = async (req: Request) => {
    const { comicId } = await req.json()

    try {
        const res = await fetch(`https://comics-api.vercel.app/comics/${comicId}`, {
            headers: {
                "Content-Type": "application/json",
                'Access-Control-Allow-Origin': '*'
            }
        })
        const data = await res.json()
        return NextResponse.json(data)
    } catch (error) {
        console.log("Invalited Error - ", error);
    }
}