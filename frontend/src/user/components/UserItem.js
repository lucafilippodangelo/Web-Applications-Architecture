import React from 'react';
import './UserItem.css';

// LD this will use DOM before that any routing or action in "App.js" is performed
import { Link } from 'react-router-dom';

import ImageBox from '../../shared/components/UI/ImageBox';
import UserBox from '../../shared/components/UI/UserBox';

const UserItem = props => {
    return (
      <UserBox className="user-item__content">
        <Link to={`/${props.id}/surfplacesx`}>
                    <div className="user-item__image">
                        <ImageBox image={props.image} alt={props.name} />
                    </div>
                    <div className="user-item__info">
                        <h2>{props.name}</h2>
                        <h3>
                        {props.placeCount} {props.placeCount === 1 ? 'Place' : 'Places'}
                        </h3>
                    </div>
        </Link>
      </UserBox>
    );
  };

export default UserItem; 