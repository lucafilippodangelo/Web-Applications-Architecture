import React from 'react';

import './UsersList.css';
import Search from './Search';
import {Box} from "@mui/material";

const UserList = props => {
    if (props.items.length === 0) { //LD need to understand when to fill props
        return (
            <div className="center">
                <Box>
                    <h2>No Records Found</h2>
                </Box>

            </div>
        );
    }

    return (
        <div>
            <Search details={props}/>
        </div>
    );
};


export default UserList; 