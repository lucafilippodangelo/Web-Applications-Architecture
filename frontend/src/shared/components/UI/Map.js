import React, {useEffect, useRef} from 'react';

import './Map.css';

const Map = props => {
    //LD in the constand "mapref" we will store a reference to the div where
    // "ref={mapRef}" is used.
    // "mapRef.current" will hold the actual pointer.
    const mapRef = useRef();

    //LD pulling "center, zoom" out of props and storing in the two constant
    const {center, zoom} = props;

    //LD it's a function that should be execured when a certain input change
    // where "[center, zoom]" are the 2 properties then when changinf
    // trigger the reload of the map
    useEffect(() => {


        const position = {
            lat: props.center.lat,
            lng: props.center.lng
        }

        const map = new window.google.maps.Map(mapRef.current, {
            center: position,//center,
            zoom: zoom
        });
        //LD render a marker
        new window.google.maps.Marker({position, map});
    }, [center, zoom]);

    return (
        <div
            //LD "ref" is a special keyword react understand. In this case the "ref" connection
            // runs after "useEffect" is triggered so after the JSX code is rendered
            ref={mapRef}
            className={`map ${props.className}`}
            style={{width: '100%', height: '400px'}}//style={props.style}
        ></div>
    );
};

export default Map;