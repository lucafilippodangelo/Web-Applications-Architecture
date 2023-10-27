import React from 'react';

import './UsersList.css';
import UserItem from './UserItem';

import UserBox from '../../shared/components/UI/UserBox';

const UserList = props => {
    if (props.items.lenght === 0)
    { //LD need to understand when to fill props 
		return ( 
            <div className="center">
                <UserBox>
                    <h2>No Records Found</h2>
                </UserBox>
                
            </div>
        );
    };
		return (
            // <div className="center">
			//     <h2>here I should display a list of surfer</h2>
		    // </div>
            <ul className="users-list">
                {props.items.map(user => (
                    <UserItem
                    id={user.id}
                    image={'https://www.kgelite.ie/wp-content/uploads/2021/06/TU-Dublin-300x300.png'}
                    name={user.name}
                    placeCount={user.places}
                    />
                ))}
            </ul>
		);
	};


export default UserList; 