import React, {Component} from 'react';
import {
  HashRouter as Router,
  Route,
  Redirect,
  Switch,
} from 'react-router-dom';

import {connect} from 'react-redux';

import Nav from '../Nav/Nav';
import Footer from '../Footer/Footer';

import ProtectedRoute from '../ProtectedRoute/ProtectedRoute'

// Component imports
import AboutPage from '../AboutPage/AboutPage';
import UserPage from '../UserPage/UserPage';
import UserTradeBlock from '../UserTradeBlock/UserTradeBlock';
import UserPortfolio from '../UserPortfolio/UserPortfolio';
import MemberTradeBlock from '../MemberTradeBlock/MemberTradeBlock';
import MemberPortfolio from '../MemberPortfolio/MemberPortfolio';
import WatchList from '../WatchList/WatchList';
import CommunityPage from '../CommunityPage/CommunityPage';
import Messages from '../Messages/Messages';
import './App.css';

// FontAwesome imports
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { library } from '@fortawesome/fontawesome-svg-core'
//import { faPaperPlane} from '@fortawesome/free-solid-svg-icons'
//import { faPaperPlane as farPaperPlane} from '@fortawesome/free-regular-svg-icons'

//library.add()

class App extends Component {
  componentDidMount () {
    this.props.dispatch({type: 'FETCH_USER'}) //inside of userSaga
  }

  render() {
    return (
      <Router>
        <div>
          {/* <Nav /> */}
          <Switch>
            {/* Visiting localhost:3000 will redirect to localhost:3000/home */}
            <Redirect exact from="/" to="/home" />
            {/* Visiting localhost:3000/about will show the about page.
            This is a route anyone can see, no login necessary */}
            <Route
              exact
              path="/about"
              component={AboutPage}
            />
            <Route
              exact
              path="/community"
              component={CommunityPage}
            />
            <Route
              exact
              path="/member-portfolio/:id"
              component={MemberPortfolio}
            />
            {/* For protected routes, the view could show one of several things on the same route.
            Visiting localhost:3000/home will show the UserPage if the user is logged in.
            If the user is not logged in, the ProtectedRoute will show the 'Login' or 'Register' page.
            Even though it seems like they are different pages, the user is always on localhost:3000/home */}
            <ProtectedRoute
              exact
              path="/home"
              component={UserPage}
            />
            {/* This works the same as the other protected route, except that if the user is logged in,
            they will see their portfolio page instead. */}
            <ProtectedRoute
              exact
              path="/trade-block"
              component={UserTradeBlock}
            />
            <ProtectedRoute
              exact
              path="/user-portfolio"
              component={UserPortfolio}
            />
            <ProtectedRoute
              exact
              path="/watch-list"
              component={WatchList}
            />
            <ProtectedRoute
              exact
              path="/member-trade-block/:id"
              component={MemberTradeBlock}
            />
            <ProtectedRoute
              exact
              path="/messages"
              component={Messages}
            />
            {/* If none of the other routes matched, we will show a 404. */}
            <Route render={() => <h1>404</h1>} />
          </Switch>
          <Footer />
        </div>
      </Router>
  )}
}

export default connect()(App);
