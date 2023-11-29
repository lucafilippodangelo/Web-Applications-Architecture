import React, {useContext} from 'react';
import {NavLink} from 'react-router-dom'; //LD this should be a special link that can analyse the url
import {authenticationContext} from '../../reactContext/authenticationContext';
import './NavLinks.css';

const NavLinks = props => {

    //LD "NavLinks.js" component will re-render any time the listened "AuthContext" will change.
    const auth = useContext(authenticationContext);

    return <ul className="nav-links">
        <li>
            <NavLink to="/" exact>Surfers</NavLink>
        </li>
        {auth.isLoggedIn && (
            <li>
                <NavLink to={`/${auth.userId}/surfplacesx`}>My Places </NavLink>
            </li>
        )}
        {auth.isLoggedIn && (
            <li>
                <NavLink to="/surfplaces/new">Add Surf Place</NavLink>
            </li>
        )}
        {/* {auth.isLoggedIn && (
          <li>
            <NavLink to={`/${auth.userId}/profile`}>Profile</NavLink>
          </li>
      )} */}
        {!auth.isLoggedIn && (
            <li>
                <NavLink to="/authenticate">Authentication</NavLink>
            </li>
        )}
        {auth.isLoggedIn && (
            <li>
                <button onClick={auth.logout}>Log out</button>
            </li>
        )}

    </ul>
};

export default NavLinks;