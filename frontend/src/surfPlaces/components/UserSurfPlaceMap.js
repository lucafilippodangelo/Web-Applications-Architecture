import Map from "../../shared/components/UI/Map";

const UserSurfPlaceMap = props => {

    return (

        <Map
            places={props.places}
            selectedPlace={props.selectedPlace}
            onPlaceSelected={props.onPlaceSelected}
            center={{lat: 53.350140, lng: -6.266155}}
            zoom={6}
        />

    )

}

export default UserSurfPlaceMap;