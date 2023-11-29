import React, {useState, useCallback, useEffect} from 'react';
//LD page routing - https://www.w3schools.com/react/react_router.asp

import {BrowserRouter as Router, Route, Redirect, Switch} from 'react-router-dom';

import Users from './user/pages/Users';
import Authenticate from './user/pages/Authenticate';
import NewSurfPlace from './surfplaces/pages/NewSurfPlace';
import Usersurfplaces from './surfplaces/pages/UserSurfPlaces';
import UpdateSurfPlace from './surfplaces/pages/UpdateSurfPlace';
import Navigation from './shared/components/navigation/Navigation';
import {authenticationContext} from './shared/reactContext/authenticationContext';


//LD hoisting https://dev.to/ugglr/react-functional-components-const-vs-function-2kj9
const App = () => {

  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userId, setUserId] = useState(false); //LD will be set when login/logout
  const [token, setToken] = useState(false); //LD as per user

  const login = useCallback((userid, token) => {
    setIsLoggedIn(true);
    setUserId(userid);
    setToken(token);

    sessionStorage.setItem("userId", userid);
    sessionStorage.setItem("token", token);

  }, []);

  const logout = useCallback(() => {
    setIsLoggedIn(false);
    setUserId(null);
    setToken(null);

    sessionStorage.removeItem("userId");
    sessionStorage.removeItem("token");

  }, []);

  useEffect(() => {

      const userId = sessionStorage.getItem("userId");
      const token = sessionStorage.getItem("token");

      if (userId && token) login(userId, token);

  });

  let routes; //LD https://www.freecodecamp.org/news/var-let-and-const-whats-the-difference/

  if (isLoggedIn) {
    routes = (
        <Switch>{/*instructions evaluated in sequence, need to use "switch". https://www.freecodecamp.org/news/react-router-cheatsheet/ Inside this block if meet routing condition, will stop evaluating next step*/}
                <Route path="/" exact>
                    <Users />
                </Route>
                <Route path="/surfplaces/new" exact>
                    <NewSurfPlace />
                </Route>
                <Route path="/:userId/surfplacesx" exact> {/* //LD this is dynamic inmut of the "id" */}
                    <Usersurfplaces />
                </Route>
                <Route path="/surfplaces/:placeId" >
                    <UpdateSurfPlace />
                </Route>
                <Route path="/:userId/profile" exact> {/* //LD this is dynamic inmut of the "id" */}
                    {/*TODO*/}<div></div>
                </Route>
                <Redirect to="/"/> {/*If path is anything else then redirect. Source https://v5.reactrouter.com/web/api/Redirect*/}
        </Switch>
    );
  } else {
    routes = (
        <Switch>
                <Route path="/" exact={true}>
                    <Users />
                </Route>
                <Route path="/:userId/surfplacesx">
                    <Usersurfplaces />
                </Route>
                <Route path="/authenticate" exact>
                    <Authenticate />
                </Route>
                <Redirect to="/authenticate"/>
        </Switch>
    );
  }


  return(
      // LD everything wrapped will use "AuthContext". Need to wrap the initial value of "authenticationContext.js"
      // that value when changing will be passed down to all the wrapped components.
      // in "value" property of "authenticationContext.Provider" div. To do that need I need "useState"
      // isLoggedIn: isLoggedIn -> gets the value of status variable "isLoggedIn"
      // login: login -> gets reference to the function
      // logout: logout -> gets reference to the function
       <authenticationContext.Provider value={{ isLoggedIn: isLoggedIn, login: login, logout: logout, userId:userId, token:token }} >
            <Router>
                <Navigation />
                <main>
                    {routes}
                </main>
            </Router>
        </authenticationContext.Provider>
        );
};

export default App;