import React, {useEffect, useRef} from 'react';
import './Map.css';


const Map = props => {
    //LD in the constand "mapref" we will store a reference to the div where
    // "ref={mapRef}" is used.
    // "mapRef.current" will hold the actual pointer.
    const mapRef = useRef();

    //LD it's a function that should be execured when a certain input change
    // where "[center, zoom]" are the 2 properties then when changinf
    // trigger the reload of the map
    useEffect(() => {

        const center = props.selectedPlace?.location ?? props.center;

        const map = new window.google.maps.Map(mapRef.current, {
            center: center,
            zoom: props.zoom,
            mapTypeId: 'satellite',
            disableDefaultUI: true
        });

        for (let place of props.places) {

            const infoWindow = new window.google.maps.InfoWindow({
                content: place.name
            });

            let marker;

            if (props.selectedPlace && place.id === props.selectedPlace.id) {

                const image =
                    "https://developers.google.com/maps/documentation/javascript/examples/full/images/beachflag.png";


                marker = new window.google.maps.Marker({
                    position: place.location,
                    title: place.name,
                    map,
                    icon: image
                });
                infoWindow.open(map, marker);


            } else {
                marker = new window.google.maps.Marker({
                    position: place.location,
                    title: place.name,
                    map
                });
            }


            window.google.maps.event.addListener(marker, "click", () => {
                infoWindow.open(map, marker);
                props.onPlaceSelected(place);
            });

        }

    });

    return (
        <div
            //LD "ref" is a special keyword react understand. In this case the "ref" connection
            // runs after "useEffect" is triggered so after the JSX code is rendered
            ref={mapRef}
            className={`map ${props.className}`}
            style={{
                position: 'fixed',
                right: 0,
                margin: 0,
                top: 0,
                padding: '0px',
                width: '100%',
                height: 'calc(100vh - 56px)'
            }}//style={props.style}
        ></div>
    );
};

export default Map;