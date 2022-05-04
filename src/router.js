import React, { useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import { useSelector } from 'react-redux'

import Signin from "./others/Signin";
import Signup from "./others/Signup";
import Signout from './others/Signout';
import Topics from './pages/Topics';
import Categories from './pages/Categories'
import Activities from "./pages/Activities";
import Navbar from './navbar'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const validUserRoutes = [

  <Route exact path="/sign-out" component={Signout} />,
  <Route exact path="/" component={Topics} />,
]

const nonValidUserRoutes = [
  <Route exact path="/sign-in" component={Signin} />,
  <Route exact path="/sign-up" component={Signup} />,
  <Route exact path="/" component={Topics} />,
  <Route exact path="/topics/:topicId/categories" component={Categories} />,
  <Route exact path="/topics/:topicId/categories/:categoryId/activities" component={Activities} />
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
      <Navbar/>
      </div>
      <Switch>
        {isUserValid ? validUserRoutes : nonValidUserRoutes}
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