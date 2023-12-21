export type GameTitle = {
    id?: number
    name: string
    deck: string
    description: string
    developers: string
    released: number
    background_image: string
    characters: string
    genres: {
        id?: number
        name: string
    }[]
}

export type GameTitles = {
    results: GameTitle[]
    page: number
    count: number
}

export type Genre = {
    id?: number
    name: string
}

export type Genres = Genre[];