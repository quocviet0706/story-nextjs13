import { NextResponse } from "next/server";

export const GET = async (req: Request) => {
    const { searchParams } = new URL(req.url)
    const query = searchParams.get('query')

    try {
        const res = await fetch(`https://comics-api.vercel.app/search?q=${query}`, {
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
