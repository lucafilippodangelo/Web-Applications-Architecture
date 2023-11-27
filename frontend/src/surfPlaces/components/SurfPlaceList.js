import React from 'react';

import UserBox from '../../shared/components/UI/UserBox';
import Surfplaceitem from './SurfPlaceItem';
import Button from '../../shared/components/FormComponents/Button';
import './SurfPlaceList.css';

// import Autocomplete from '@mui/material/Autocomplete';
// import TextField from '@mui/material/TextField';
// import Stack from '@mui/material/Stack';

const Surfplacelist = props => {
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

  //else
  return (
    <ul className="place-list">

      {props.items.map(place => (
        <Surfplaceitem
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
      ))}
    </ul>
  );
};

export default Surfplacelist;