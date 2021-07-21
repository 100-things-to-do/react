import React from 'react';
import '../../node_modules/bootstrap/dist/css/bootstrap.min.css';
import './MainApp.css';
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import { useSelector, useDispatch } from 'react-redux'

import Signin from "./Signin";
import Signup from "./Signup";
import Auctions from './Auctions';
import Signout from './Signout';

function App() {
  const isUserValid = useSelector(state => state.user.isUserValid)
  return (<Router>
    <div className="App">
      <nav className="navbar navbar-expand-lg navbar-light fixed-top">
        <div className="container">
          <Link className="navbar-brand" to={"/sign-in"}>Oglet</Link>
          <div className="collapse navbar-collapse" id="navbarTogglerDemo02">
            <ul className="navbar-nav ml-auto">
              {isUserValid ? (
                null
             
              ) : 
              (
                <li className="nav-item">
                  <Link className="nav-link" to={"/sign-in"}>Login</Link>
                </li>   
              )
              }

              {isUserValid ? (
                <li className="nav-item">
                  <Link className="nav-link" to={"/sign-out"}>Sign out</Link>
                </li>

              ) : (
                <li className="nav-item">
                  <Link className="nav-link" to={"/sign-up"}>Sign up</Link>
                </li>          
              )
              }

            </ul>
          </div>
        </div>
      </nav>


          <Switch>
            <Route exact path='/' component={Signin} />
            <Route path="/sign-in" component={Signin} />
            <Route path="/sign-up" component={Signup} />
            <Route path="/sign-out" component={Signout}/>
            <Route path="/auctions" component={Auctions}/>
          </Switch>

    </div></Router>
  );
}

export default App;