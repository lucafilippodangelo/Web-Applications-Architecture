export interface IFindPlaceResponse {
    id: string
    creatorId: string
    name: string
    description: string
    address: string
    location: {
        lat: number
        lng: number
    },
    imageUrl?: string
}