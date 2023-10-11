import React from 'react';
//LD page routing - https://www.w3schools.com/react/react_router.asp
//LD 
import {BrowserRouter as Router, Route, Redirect, Switch} from 'react-router-dom'; 

import Users from './user/pages/Users';
import NewSurfPlace from './surfPlaces/pages/NewSurfPlace';

function App() {
  return <Router>
            <Switch>{/*instructions evaluated in sequence, need to use "switch". https://www.freecodecamp.org/news/react-router-cheatsheet/ Inside this block if meet routing condition, will stop evaluating next step*/}
          
                      <Route path="/" exact={true}> {/* LD with "exact", if the path is exactly "http://localhost:3000/" it render the "User.js" page*/}
                           <Users />
                      </Route>
                      <Route path="/surfplaces/new" exact={true}> 
                           <NewSurfPlace /> 
                      </Route>
                      <Redirect to="/"/> {/*If path is anything else then redirect. Source https://v5.reactrouter.com/web/api/Redirect*/}
            </Switch>             
        </Router>
        




}

export default App;