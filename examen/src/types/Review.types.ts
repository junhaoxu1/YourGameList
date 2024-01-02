export type Review = {
    id?: number
    uid: string
    text: string
    userEmail: string
    gameId: number
}

export type Reviews = {
    results: Review[]
}