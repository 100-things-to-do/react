import React, { useEffect } from 'react';
import '../../../node_modules/bootstrap/dist/css/bootstrap.min.css';
import './MainApp.css';
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import { useSelector } from 'react-redux'

import Signin from "../Signin";
import Signup from "../Signup";
import Signout from '../Signout';
import DomainSelector from '../DomainSelector';
import Domain from '../Domain'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const validUserNavItemsLeftAlign = [
  <li className="nav-item">
    <Link className="nav-link" to={"/domain-selector"}>Domain Selector</Link>
  </li>

]

const validUserNavItemsRightAlign = [
  <li className="nav-item">
    <Link className="nav-link" to={"/sign-out"}>Sign out</Link>
  </li>

]

const nonValidUserNavItemsLeftAlign = [
  <li className="nav-item">
    <Link className="nav-link" to={"/domain-selector"}>Domain Selector</Link>
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
  <Route exact path="/" component={DomainSelector} />,
]

const nonValidUserRoutes = [
  <Route exact path="/sign-in" component={Signin} />,
  <Route exact path="/sign-up" component={Signup} />,
  <Route exact path="/" component={DomainSelector} />,
  <Route exact path="/domain/:id" component={Domain} />
]

const commonRoutes = [
  <Route exact path="/domain-selector" component={DomainSelector} />
]

function MainRouter() {
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
      <div className="container">
        <div className="collapse navbar-collapse" id="navbarTogglerDemo02">
          <ul className="navbar-nav ml-auto">
            {isUserValid ? validUserNavItemsLeftAlign : nonValidUserNavItemsLeftAlign}
          </ul>
          <ul className="navbar-nav ms-auto">
            {isUserValid ? validUserNavItemsRightAlign : nonValidUserNavItemsRightAlign}
          </ul>
        </div>
      </div>

      <Switch>
        {isUserValid ? validUserRoutes : nonValidUserRoutes}
        {commonRoutes}
      </Switch>




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

export default MainRouter;