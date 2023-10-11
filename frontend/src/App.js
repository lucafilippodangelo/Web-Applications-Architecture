import React from 'react';
import {BrowserRouter as Router, Route} from 'react-router-dom'; //LD page routing - https://www.w3schools.com/react/react_router.asp

import Users from './user/pages/Users';

function App() {
  return <Router>
              <Route path="/"> 
                <Users />
              </Route>
        </Router>
}

export default App;