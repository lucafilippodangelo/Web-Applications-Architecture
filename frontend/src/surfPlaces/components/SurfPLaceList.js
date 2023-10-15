import React from 'react';

import UserBox from '../../shared/components/UI/UserBox';
import SurfPlaceItem from './SurfPlaceItem';
import './Surfplacelist.css';

const Surfplacelist = props => {
  if (props.items.length === 0) {
    return (
      <div className="place-list center">
        <UserBox>
          <h2>nothing ffs</h2>
          <button>Share Surf Place</button>
        </UserBox>
      </div>
    );
  }

  return (
    <ul className="place-list">
      {props.items.map(place => (
        <SurfPlaceItem
          key={place.id}
          id={place.id}
          image={place.imageUrl}
          title={place.title}
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