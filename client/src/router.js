// import { useEffect } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Calendar from "./page/Calendar/Calendar";
import Home from "./Home";
import React from "react";
import ProfilePage from "./page/ProfilePage/ProfilePage";
import EditMyProfile from "./page/ProfilePage/EditProfile";
import MyPage from "./page/MyPage/MyPage";
import AddEvent from "./page/addEvent/addEvent.js";
import EventDetailsPage from "./page/EventDetails/EventDetailsPage";
import Login from "./components/auth/Login";
import Register from "./components/auth/Register";
import AdminTools from "./page/AdminTools/AdminTools";
import CreatorProfile from "./page/CreatorProfile/CreatorProfile";
import { Provider } from "react-redux";
import store from "./store";
import jwt_decode from "jwt-decode";
import setAuthToken from "./utils/setAuthToken";
import { setCurrentUser, logoutUser } from "./actions/authActions";
import PrivateRoute from "./components/private-route/PrivateRoute";

// Check for token to keep user logged in
if (localStorage.jwtToken) {
  // Set auth token header auth
  const token = localStorage.jwtToken;
  setAuthToken(token);

  // Decode token and get user info and exp
  const decoded = jwt_decode(token);

  // Set user and isAuthenticated
  store.dispatch(setCurrentUser(decoded));

  // Check for expired token
  const currentTime = Date.now() / 1000; // to get in milliseconds

  if (decoded.exp < currentTime) {
    // Logout user
    store.dispatch(logoutUser());
    // Redirect to login
    window.location.href = "./login";
  }
}

// function ScrollToTop({ history, children }) {
//   useEffect(() => {
//     const unlisten = history.listen(() => {
//       window.scrollTo(0, 0);
//     });
//     return () => {
//       unlisten();
//     };
//   }, [history]);
//   return children;
// }
// const ScrollTop = withRouter(ScrollToTop);

export class CustomRoute extends React.Component {
  // constructor() {
  //   super();
  //   this.state = {
  //     isLogin: "",
  //   };
  // }
  render() {
    return (
      <Provider store={store}>
        <Router>
          {/* <ScrollTop> */}
          <Switch>
            <Route path="/" exact component={Home} />
            <Route path="/login" component={Login} />
            <Route path="/register" component={Register} />
            <Route path="/calendar" component={Calendar} />
            <Route path="/event" component={EventDetailsPage} />
            <Route path="/profile" component={ProfilePage} />
            <Route path="/creator-profile" component={CreatorProfile} />
            <Switch>
              <PrivateRoute exact path="/create" component={AddEvent} />
              <PrivateRoute exact path="/mypage" component={MyPage} />
              <PrivateRoute path="/editprofile" component={EditMyProfile} />
              <PrivateRoute exact path="/admin-tools" component={AdminTools} />
            </Switch>
          </Switch>
          {/* </ScrollTop> */}
        </Router>
      </Provider>
    );
  }
}
