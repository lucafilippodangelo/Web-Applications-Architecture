export interface IFindAllPlacesResponse {
    places: IFindAllPlacesResponsePlace[]
}

export interface IFindAllPlacesResponsePlace {
    id: string
    creatorId: string
    name: string
}