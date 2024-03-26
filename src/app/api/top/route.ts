import { comicsProps } from "@/types/typeProps";
import { NextResponse } from "next/server";

export const POST = async (req: Request) => {
    const { type, limit, page, status } = await req.json()

    try {
        const res = await fetch(`https://comics-api.vercel.app/top${type ? (type === 'all' ? '' : `/${type}`) : ''} ${page ? `?page=${page}` : ''} ${status ? `&status=${status}` : ''}`, {
            headers: {
                "Content-Type": "application/json",
                'Access-Control-Allow-Origin': '*'
            }
        })
        const { comics } = await res.json()

        const newData = await limit ? comics.filter((item: comicsProps, index: number) => index < limit) : comics;
        return NextResponse.json(newData)
    } catch (error) {
        console.log("Invalited Error - ", error);
    }
}

export const GET = async (req: Request) => {
    try {
        const res = await fetch(`https://comics-api.vercel.app/top`, {
            headers: {
                "Content-Type": "application/json",
                'Access-Control-Allow-Origin': '*'
            }
        })
        const { comics } = await res.json()

        return NextResponse.json(comics)
    } catch (error) {
        console.log("Invalited Error - ", error);
    }
}

