import React, {useState} from 'react';
import {Link} from 'react-router-dom';

import Header from './Header';
import NavLinks from './NavLinks';
import SideDrawer from './SideDrawer';
import Backdrop from '../UI/Backdrop';

import './Navigation.css';

const Navigation = props => {

    //going to use STATE for the drawer
    const [drawerIsOpen, setDrawerIsOpen] = useState(false); //by default "drawerIsOpen=false"


    //creating a function to OPEN and CLOSE the drawer.
    const openDrawer = () => {
        setDrawerIsOpen(true);
    }
    const closeDrawer = () => {
        setDrawerIsOpen(false);
    }

    return (
        <React.Fragment> {/*LD Useful to wrap two header divs. JSX allow one single entrance point */}

            {/* render "Backdrop" if true */}
            {drawerIsOpen && <Backdrop onClick={closeDrawer}/>}

            {/* the transition logic in "SideDrawer" component depends from the value received in props "show"*/}
            <SideDrawer show={drawerIsOpen} onClick={closeDrawer}>
                <nav className="navigation__drawer-nav">
                    <NavLinks/>
                </nav>
            </SideDrawer>

            <Header>
                {/*
            LD the content inside div "Header" will go to fill what is in 
            "props.children" of the component "Header.js" (so the child).
            https://medium.com/@martin.crabtree/react-js-using-children-props-c83d5b259756#:~:text=The%20%7B%20props.,be%20rendered%20by%20the%20child.
            */}
                <button className="navigation__menu-btn" onClick={openDrawer}>
                    <span/>
                    <span/>
                    <span/>
                </button>
                {/* LD below just the top left title defaulting to "Surf PLaces" */}
                <h1 className="navigation__title">
                    <Link to="/">Your Surf Places</Link>
                </h1>
                {/* LD below the menu */}
                <nav className="navigation__header-nav">
                    <NavLinks/>
                </nav>
            </Header>
        </React.Fragment>
    );
};

export default Navigation;