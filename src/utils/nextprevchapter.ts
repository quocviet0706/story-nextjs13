import { singleComic } from "@/types/typeProps";

interface chapterProps {
    id: string
    name: string
}

export const getChapter = async (slug: string, chapterId: string) => {
    try {
        const res = await fetch(`https://comics-api.vercel.app/comics/${slug}/chapters/${chapterId}`)
        const data = await res.json();
        return data;

    } catch (error) {
        new Error('Error');
    }

}

export const getNextChapter = async (slug: string, nextChapter: chapterProps) => {
    if (nextChapter === undefined) {
        return { msg: 400, data: null }
    } else {
        const nextChapterData: singleComic = await getChapter(slug, nextChapter.id)
        return { msg: 200, data: nextChapterData };
    }
}


export const getPrevChapter = async (slug: string, prevChapter: chapterProps) => {
    if (prevChapter === undefined) {
        return { msg: 400, data: null }
    } else {
        const prevChapterData: singleComic = await getChapter(slug, prevChapter.id)
        return { msg: 200, data: prevChapterData };
    }
}