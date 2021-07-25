import React from 'react';
import '../../node_modules/bootstrap/dist/css/bootstrap.min.css';
import './MainApp.css';
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import { useSelector } from 'react-redux'

import Signin from "./Signin";
import Signup from "./Signup";
import Signout from './Signout';
import AddAuction from './AddAuction';
import Auctions from './Auctions';
import Auction from './Auction';


const validUserNavItems = [
  <li className="nav-item">
    <Link className="nav-link" to={"/auctions"}>Auctions</Link>
  </li>,
  <li className="nav-item">
    <Link className="nav-link" to={"/sign-out"}>Sign out</Link>
  </li>

]

const nonValidUserNavItems = [
  <li className="nav-item">
    <Link className="nav-link" to={"/sign-in"}>Login</Link>
  </li>,
  <li className="nav-item">
    <Link className="nav-link" to={"/sign-up"}>Sign up</Link>
  </li> 

]

function App() {
  const isUserValid = useSelector(state => state.user.isUserValid)
  return (<Router>
    <div className="App">
      <nav className="navbar navbar-expand-lg navbar-light fixed-top">
        <div className="container">
          <Link className="navbar-brand" to={"/"}>Oglet</Link>
          <div className="collapse navbar-collapse" id="navbarTogglerDemo02">
            <ul className="navbar-nav ml-auto">
              {isUserValid ? validUserNavItems : nonValidUserNavItems}
            </ul>
          </div>
        </div>
      </nav>

      <Switch>
        <Route exact path='/' component={Signin} />
        <Route path="/sign-in" component={Signin} />
        <Route path="/sign-up" component={Signup} />
        <Route path="/sign-out" component={Signout}/>
        <Route path="/addAuction" component={AddAuction}/>
        <Route path="/auctions" component={Auctions}/>
        <Route path="/auction/:id" component={Auction}/>
        {isUserValid ? 
          <Route path="/" component={AddAuction}/> 
          : <Route path="/" component={Signin}/>
        }
      </Switch>



      <div className="card bg-secondary border-0 vbottom">
        <div className="card-body text-light text-center">
          <h5 className="card-title text-white display-4" style={{fontSize:30}}>Telif Hakkı</h5>
          <p className="d-inline lead">Tüm Hakları Saklıdır © 2018
          <br/>
          <a href="#" className="text-light d-block lead">Blog</a>
          </p>
        </div>
      </div>




    </div>
    </Router>
  );
}

export default App;