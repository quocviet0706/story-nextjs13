export interface genresProps {
    description: string,
    id: string,
    name: string
}

export interface searchComicsProps {
    id: string,
    title: string,
    thumbnail: string,
    status: string,
    genres: string[],
    total_views: number,
    followers: number,
    last_chapter: {
        id: number,
        name: string,
    },
    other_name: string[]
    updated_at: string
}

export interface comicsProps {
    id: string,
    title: string,
    thumbnail: string,
    updated_at: string,
    is_trending: boolean,
    genres: {
        id: string,
        name: string
    }[],
    short_description: string,
    other_names: string[],
    status: string,
    total_views: number,
    followers: number,
    last_chapter: {
        id: number,
        name: string,
    },
}

export interface comicsDetailsProps {
    id: string,
    title: string,
    thumbnail: string,
    updated_at: string,
    genres: {
        id: string,
        name: string
    }[],
    description: string,
    other_names: string[],
    status: string,
    total_views: number,
    followers: number,
    authors: string,
    chapters: {
        id: number,
        name: string
    }[]
}

export interface topComicsProps {
    page?: number
    limit?: number
    status?: 'all' | 'completed' | 'updating'
    type?: 'all' | 'daily' | 'weekly' | 'monthly' | 'chapter' | 'follow' | 'comment' | string
}

export interface singleComic {
    images: {
        page: number
        src: string
        backup_src: string
    }[]
    chapters: {
        id: string
        name: string
    }[]
    chapter_name: string
    comic_name: string
}