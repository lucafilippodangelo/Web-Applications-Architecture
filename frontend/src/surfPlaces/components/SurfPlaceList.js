import React from 'react';

import UserBox from '../../shared/components/UI/UserBox';
import SurfPlaceItem from './SurfPlaceItem';
import Grid from '@mui/material/Unstable_Grid2';
import {Button} from "@mui/material";
import {Link} from "react-router-dom";

const SurfPlaceList = props => {
    if (props.items.length === 0) {
        return (
            <div className="place-list center">
                <UserBox>
                    <h2>no surf places for this surfer</h2>
                    <Button variant={"contained"} component={Link} to="/surfplaces/new">Create New Surf Place</Button>
                </UserBox>
            </div>
        );
    }

    return (
        <Grid container spacing={2}>
            {props.items.map(place => (
                <Grid item xs={12} md={6}>
                    <SurfPlaceItem
                        key={place.id}
                        id={place.id}
                        //image={place.imageUrl}
                        name={place.name}
                        description={place.description}
                        address={place.address}
                        creatorId={place.creatorId}
                        tags={place.tags}
                        coordinates={place.location}
                        onDelete={props.onDeletePlace}
                    />
                </Grid>
            ))}
        </Grid>
    );
};

export default SurfPlaceList;