export type GameDetail = {
    id?: number
    name: string
    deck: string
    description: string
    developers: string
    release: number
    background_image: string
    characters: string
    genres: string
}

export type GameDetails = {
    results: GameDetail[]
    page: number
    total_pages: number
}

export type Genre = {
    id?: number
    name: string
}

export type Genres = Genre[];