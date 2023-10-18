import React, {useState, useCallback} from 'react';
//LD page routing - https://www.w3schools.com/react/react_router.asp

import {BrowserRouter as Router, Route, Redirect, Switch} from 'react-router-dom'; 

import Users from './user/pages/Users';
import Authenticate from './user/pages/Authenticate';
import NewSurfPlace from './surfplaces/pages/NewSurfPlace';
import Usersurfplaces from './surfplaces/pages/Usersurfplaces';
import UpdateSurfPlace from './surfplaces/pages/UpdateSurfPlace';
import Navigation from './shared/components/navigation/Navigation';
import {authenticationContext} from './shared/reactContext/authenticationContext';

//LD hoisting https://dev.to/ugglr/react-functional-components-const-vs-function-2kj9
const App = () => {

  console.log("LD doing authentication");
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const login = useCallback(() => { 
    setIsLoggedIn(true);
  }, []);

  const logout = useCallback(() => {
    setIsLoggedIn(false);
  }, []);

  return( 
      // LD everything wrapped will use "AuthContext". Need to wrap the initial value of "authenticationContext.js"
      // that value when changing will be passed down to all the wrapped components.
      // in "value" property of "authenticationContext.Provider" div. To do that need I need "useState"
      // isLoggedIn: isLoggedIn -> gets the value of status variable "isLoggedIn"
      // login: login -> gets reference to the function
      // logout: logout -> gets reference to the function
   <authenticationContext.Provider value={{ isLoggedIn: isLoggedIn, login: login, logout: logout }}
 >
            <Router>
                <Navigation />
                <main>
                    <Switch>{/*instructions evaluated in sequence, need to use "switch". https://www.freecodecamp.org/news/react-router-cheatsheet/ Inside this block if meet routing condition, will stop evaluating next step*/}
                            <Route path="/" exact={true}> {/* LD with "exact", if the path is exactly "http://localhost:3000/" it render the "User.js" page*/}
                                <Users />
                            </Route>
                            <Route path="/surfplaces/new" exact={true}> 
                                <NewSurfPlace /> 
                            </Route>
                            <Route path="/:userId/surfplacesx"> {/* //LD this is dynamic inmut of the "id" */}
                                <Usersurfplaces /> 
                            </Route>
                            <Route path="/surfplaces/:placeId" >
                                <UpdateSurfPlace />
                            </Route>
                            <Route path="/authenticate" exact>
                                <Authenticate />
                            </Route>
                            <Redirect to="/"/> {/*If path is anything else then redirect. Source https://v5.reactrouter.com/web/api/Redirect*/}
                    </Switch>  
                </main>           
            </Router>
            </authenticationContext.Provider>
        );
};

export default App;