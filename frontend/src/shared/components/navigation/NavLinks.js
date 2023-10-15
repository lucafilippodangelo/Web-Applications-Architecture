import React from 'react';
import { NavLink } from 'react-router-dom'; //LD this should be a special link that can analyse the url

import './NavLinks.css';

const NavLinks = props => {
  return <ul className="nav-links">
    <li>
      <NavLink to="/" exact>Surfers</NavLink>
    </li>
    <li>
      <NavLink to="/u1/surfplacesx">Surfer Places</NavLink>
    </li>
    <li>
      <NavLink to="/surfplaces/new">Add Surf Place</NavLink>
    </li>
    <li>
      <NavLink to="/auth">Authentication</NavLink>
    </li>
  </ul>
};

export default NavLinks;