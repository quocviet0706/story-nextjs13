import { comicsProps, topComicsProps } from "@/types/typeProps";
import sendRequest from "@/utils/sendRequest";

// ======================== GET ALL GENRES COMICS ================ //
export const getGenresComic = async () => {
    try {
        const { data } = await sendRequest.get("/genres");
        return data
    } catch (error) {
        console.log('Error');
    }
}

// ===================== GET TRENDING ============================ //
export const getTrending = async ({ page, limit }: topComicsProps) => {
    try {
        const { data } = await sendRequest.get(`/trending-comics${page ? `?page=${page}` : ''}`) // Call API lấy top truyện trending
        return limit ? data.comics.filter((item: comicsProps, index: number) => index < limit) : data.comics;

    } catch (error) {
        console.log('Error');
    }
}


// ===================== GET TOP COMICS ============================ //
export const getTopComics = async ({ type, limit, page, status }: topComicsProps) => {
    try {
        const { data } = await sendRequest.get(`/top${type ? (type === 'all' ? '' : `/${type}`) : ''} ${page ? `?page=${page}` : ''} ${status ? `&status=${status}` : ''}`) // Call API lấy top truyện trending

        return limit ? data.comics.filter((item: comicsProps, index: number) => index < limit) : data.comics;

    } catch (error) {
        console.log('Error');
    }
}


// ===================== GET Full COMICS ============================ //
export const getFullComics = async ({ limit, page }: topComicsProps) => {
    try {
        const { data } = await sendRequest.get(`/completed-comics${page ? `?page=${page}` : ''}`) // Call API lấy truyện full trending
        return limit ? data.comics.filter((item: comicsProps, index: number) => index < limit) : data.comics;
    } catch (error) {
        console.log('Error');
    }
}

// ===================== GET Full COMICS ============================ //
export const getRecentUpdated = async ({ limit, page }: topComicsProps) => {
    try {
        const { data } = await sendRequest.get(`/recent-update-comics${page ? `?page=${page}` : ''}`) // Call API lấy truyện full trending
        return limit ? data.comics.filter((item: comicsProps, index: number) => index < limit) : data.comics;
    } catch (error) {
        console.log('Error');
    }
}