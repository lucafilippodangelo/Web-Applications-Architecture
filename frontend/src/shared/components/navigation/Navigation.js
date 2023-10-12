import React from 'react';
import { Link } from 'react-router-dom';

import Header from './Header';
import NavLinks from './NavLinks';
import './Navigation.css';

const MainNavigation = props => {
  return (
    <Header>
        {/* 
        LD the content inside div "Header" will go to fill what is in 
        "props.children" of the component "Header.js" (so the child).
        https://medium.com/@martin.crabtree/react-js-using-children-props-c83d5b259756#:~:text=The%20%7B%20props.,be%20rendered%20by%20the%20child.
        */}
        <button className="navigation__menu-btn">
          <span />
          <span />
          <span />
        </button>
        <h1 className="navigation__title">
          <Link to="/">Surf Places</Link>
        </h1>
        <nav>
            <NavLinks />
        </nav>
    </Header>
  );
};

export default MainNavigation;