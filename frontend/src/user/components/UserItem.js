import React from 'react';
import './UserItem.css';

const UserItem = props => {
    return (
      <li >
        <div >
          <div >
            <img src={props.image} alt={props.name} />
          </div>
          <div>
            <h2>{props.name}</h2>
            <h3>
              {props.placeCount} {props.placeCount === 1 ? 'Surf Place' : 'Surf Places'}
            </h3>
          </div>
        </div>
      </li>
    );
  };

export default UserItem; 