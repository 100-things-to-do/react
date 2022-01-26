import React, { useEffect } from 'react';
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
import Credit from './Credit';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const validUserNavItemsLeftAlign = [
  <li className="nav-item">
    <Link className="nav-link" to={"/auctions"}>Auctions</Link>
  </li>,
  <li className="nav-item">
    <Link className="nav-link" to={"/addAuction"}>Add Auction</Link>
  </li>,
  <li className="nav-item">
    <Link className="nav-link" to={"/credit"}>Add Credit</Link>
  </li>

]

const validUserNavItemsRightAlign = [
  <li className="nav-item">
    <Link className="nav-link" to={"/sign-out"}>Sign out</Link>
  </li>

]

const nonValidUserNavItemsLeftAlign = [
  <li className="nav-item">
    <Link className="nav-link" to={"/auctions"}>Auctions</Link>
  </li>

]

const nonValidUserNavItemsRightAlign = [
  <li className="nav-item">
    <Link className="nav-link" to={"/sign-in"}>Login</Link>
  </li>,
  <li className="nav-item">
    <Link className="nav-link" to={"/sign-up"}>Sign up</Link>
  </li>

]

const validUserRoutes = [

  <Route exact path="/sign-out" component={Signout} />,
  <Route exact path="/addAuction" component={AddAuction} />,
  <Route exact path="/credit" component={Credit} />,
  <Route exact path="/" component={Auctions} />,
]

const nonValidUserRoutes = [
  <Route exact path="/sign-in" component={Signin} />,
  <Route exact path="/sign-up" component={Signup} />,
  <Route exact path="/" component={Auctions} />
]

const commonRoutes = [
  <Route exact path="/auctions" component={Auctions} />,
  <Route exact path="/auction/:id" component={Auction} />
]

function App() {
  const isUserValid = useSelector(state => state.user.isUserValid)
  const toastMsg = useSelector(state => state.user.toastMsg)
  const toastMsgType = useSelector(state => state.user.toastMsgType)
  //const toastMsgCount = useSelector(state => state.user.toastMsgCount) 

  useEffect(() => {
    if (toastMsg !== '') {
      if (toastMsgType === 'success') {
        toast.success(toastMsg, {
          position: "bottom-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        });
      } else if (toastMsgType === 'error') {
        toast.error(toastMsg, {
          position: "bottom-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        });
      }
    }
  }, [toastMsg, toastMsgType])


  return (<Router>
    <div className="App">
      <nav className="navbar navbar-expand-lg navbar-light fixed-top">
        <div className="container">
          <Link className="navbar-brand" to={"/"}>Oglet</Link>
          <div className="collapse navbar-collapse" id="navbarTogglerDemo02">
            <ul className="navbar-nav ml-auto">
              {isUserValid ? validUserNavItemsLeftAlign : nonValidUserNavItemsLeftAlign}
            </ul>
            <ul className="navbar-nav ms-auto">
              {isUserValid ? validUserNavItemsRightAlign : nonValidUserNavItemsRightAlign}
            </ul>
          </div>
        </div>
      </nav>

      <Switch>
        {isUserValid ? validUserRoutes : nonValidUserRoutes}
        {commonRoutes}
      </Switch>



      <div className="card bg-secondary border-0 vbottom">
        <div className="card-body text-light text-center">
          <h5 className="card-title text-white display-4" style={{ fontSize: 30 }}>Telif Hakkı</h5>
          <p className="d-inline lead">Tüm Hakları Saklıdır © 2018
            <br />
            <a href="#" className="text-light d-block lead">Blog</a>
          </p>
        </div>
      </div>
      <ToastContainer
        position="bottom-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />
    </div>
  </Router>
  );
}

export default App;