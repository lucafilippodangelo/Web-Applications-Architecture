import React from 'react';
import './UsersList.css';
import UserItem from './UserItem';

const UserList = props => {
    if (props.items.lenght === 0)
    { //LD need to understand when to fill props 
		return ( 
            <div className="center">
                <h2>No Records Found</h2>
            </div>
        );
    };
		return (
            // <div className="center">
			//     <h2>here I should display a list of surfer</h2>
		    // </div>
            <ul>
                {props.items.map(user => (
                    <UserItem
                    key={user.id}
                    id={user.id}
                    image={user.image}
                    name={user.name}
                    placeCount={user.places}
                    />
                ))}
            </ul>
		);
	};


export default UserList; 