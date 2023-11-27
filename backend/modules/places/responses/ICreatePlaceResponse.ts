export interface ICreatePlaceResponse {
    id: string
    creatorId: string
    name: string
    address: string
    description: string
    location: {
        lat: number
        lng: number
    },
    imageUrl?: string,
    tags: string[]
}