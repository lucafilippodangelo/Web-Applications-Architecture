import React from 'react';
import ReactDOM from 'react-dom';
import { CSSTransition } from 'react-transition-group';

import './SideDrawer.css';

const SideDrawer = props => {
//    const content = <aside className="side-drawer"> 
//                       {props.children}
//                    </aside>;
/*LD common used -> https://www.w3schools.com/tags/tag_aside.asp*/


const content = (
            <CSSTransition 
                in={props.show} //LD the received "props.show" is a boolean
                timeout={200} 
                classNames="slide-in-left" 
                mountOnEnter 
                unmountOnExit
                >
                <aside className="side-drawer" onClick={props.onClick}>{props.children}</aside>
            </CSSTransition>
        );
    return ReactDOM.createPortal(content, document.getElementById('drawer-hook'));
};

export default SideDrawer;

// PORTALS 
// LD instead to return "<aside className="side-drawer">{props.children}</aside>"
// this approach works like: when ever this SideDrawer.js is invoched, please render 
// what in "content" variable in "index.html" where you find the tag 'drawer-hook' -> 
//"document.getElementById('drawer-hook')" 