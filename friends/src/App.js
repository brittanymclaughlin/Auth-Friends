  
import React from 'react';
import { BrowserRouter as Router, Route, Switch} from "react-router-dom";

import './App.css';
import LogIn from './components/Login';
import FriendsList from './components/FriendsList';

function App() {
  return (
    <Router>
      <Switch>
        <Route exact path="/friends" component={FriendsList}/>
        <Route component={LogIn} />
      </Switch>
    </Router>

  );
}

export default App;