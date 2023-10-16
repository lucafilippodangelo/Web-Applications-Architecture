import React from 'react';

import UserBox from '../../shared/components/UI/UserBox';
import Surfplaceitem from './Surfplaceitem';
import Button from '../../shared/components/FormComponents/Button';
import './Surfplacelist.css';

const Surfplacelist = props => {
  if (props.items.length === 0) {
    return (
      <div className="place-list center">
        <UserBox>
          <h2>nothing ffs</h2>
          <Button to="/surfplaces/new">Create New Surf Place</Button>
        </UserBox>
      </div>
    );
  }

  return (
    <ul className="place-list">
      {props.items.map(place => (
        <Surfplaceitem
          key={place.id}
          id={place.id}
          image={place.imageUrl}
          name={place.name}
          description={place.description}
          address={place.address}
          creatorId={place.creator}
          coordinates={place.location}
        />
      ))}
    </ul>
  );
};

export default Surfplacelist;