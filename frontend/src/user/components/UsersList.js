import React from 'react';

import './UsersList.css';
import Search from './Search';

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
            <div >
                <Search details={props}/>
            </div>
		);
	};


export default UserList; 