import React from 'react';

import './UserBox.css';

const UserBox = props => {
    return (
        <div className={`userbox ${props.className}`} style={props.style}>
            {props.children}
        </div>
    );
};

export default UserBox;