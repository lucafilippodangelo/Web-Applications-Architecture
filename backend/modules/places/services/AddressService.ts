import { Client, PlaceInputType } from "@googlemaps/google-maps-services-js"

export interface IAddress {
    address: string,
    coordinates: number[]
}

export default async function findAddress(address: string): Promise<IAddress | null> {
    
    const client = new Client();

    const response = await client.findPlaceFromText({params: {
        input: address,
        inputtype: PlaceInputType.textQuery,
        key: process.env.GOOGLE_MAPS_API_KEY!
    }});

    if(!response.data.candidates.length) return null;

    const place = response.data.candidates[0];

    const details = await client.placeDetails({params:{
        place_id: place.place_id!,
        key: process.env.GOOGLE_MAPS_API_KEY!
    }});

    return {
        address: details.data.result.formatted_address ?? "",
        coordinates: [details.data.result.geometry?.location.lng ?? 0, details.data.result.geometry?.location.lat ?? 0]
    };

}