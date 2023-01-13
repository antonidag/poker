export interface Player {
    name: string
    age: number
    nickname: string
    img: string
}

export interface GameHistory {
    name: string,
    date: Date,
    note: string,
    buyin: number,
    extra: number,
    placements: string[]
}

export interface PlacementPoints {
    [index: number]: string;
}