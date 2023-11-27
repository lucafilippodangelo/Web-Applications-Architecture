import React from 'react';

import UserBox from '../../shared/components/UI/UserBox';
import SurfPlaceItem from './SurfPlaceItem';
import Button from '../../shared/components/FormComponents/Button';
import Grid from '@mui/material/Unstable_Grid2';

const SurfPlaceList = props => {
  if (props.items.length === 0) {
    return (
      <div className="place-list center">
        <UserBox>
          <h2>no surf places for this surfer</h2>
          <Button to="/surfplaces/new">Create New Surf Place</Button>
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