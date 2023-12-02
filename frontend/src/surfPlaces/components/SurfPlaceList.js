import React from 'react';

import SurfPlaceItem from './SurfPlaceItem';
import {Box, Button} from "@mui/material";
import {Link} from "react-router-dom";

import "./SurfPlaceList.css"

const SurfPlaceList = props => {
    if (props.items.length === 0) {
        return (
            <div className="place-list center">
                <Box>
                    <h2>No Places Found :(</h2>
                    <Button variant={"contained"} component={Link} to="/surfplaces/new">Create New Surf Place</Button>
                </Box>
            </div>
        );
    }

    return (
        <Box id={"scrollGrid"} sx={{height: "calc(100vh - 250px)", overflowY: "scroll", overflowX: "hidden"}}>
                {props.items.map(place => (
                        <SurfPlaceItem
                            key={place.id}
                            place={place}
                            onDelete={props.onDeletePlace}
                            onPlaceSelected={props.onPlaceSelected}
                            selectedPlace={props.selectedPlace}
                        />
                ))}
        </Box>
    );
};

export default SurfPlaceList;