import React from 'react';
import ReactDOM from 'react-dom';

import './Backdrop.css';

const Backdrop = props => {
    return ReactDOM.createPortal(
        //LD the logic to close the drawer is on the parent component "MainNavigation"
        // so below we emit a function we expect to be on the props we receiving.
        // in summary we expect the caller to have an "onClick" button.
        <div className="backdrop" onClick={props.onClick}></div>,

        //LD below I utilise the portal technique. Will then render this component in index.html
        document.getElementById('backdrop-hook')
    );
};

export default Backdrop;