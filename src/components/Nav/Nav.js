import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import LogOutButton from '../LogOutButton/LogOutButton';
import './Nav.css';

const Nav = (props) => (
  <div className="nav">
    <Link to="/home">
      <h2 className="nav-title">cardSwap</h2>
    </Link>
    <div className="nav-right">
      <Link className="nav-link" to="/home">
        {/* Show this link if they are logged in or not,
        but call this link 'Home' if they are logged in,
        and call this link 'Login / Register' if they are not */}
        {props.userReducer.id ? 'Home' : 'Login / Register'}
      </Link>
      {/* Show link to the user trade block, portfolio, community, and the logout button if the user is logged in */}
      {props.userReducer.id && (
        <>
          <Link className="nav-link" to="/trade-block">
            Trade Block
          </Link>
          <Link className="nav-link" to="/user-portfolio">
            Portfolio
          </Link>
          <Link className="nav-link" to="/watch-list">
            Watch List
          </Link>
          <Link className="nav-link" to="/community">
            Community
          </Link>
          <Link className="nav-link" to="/messages">
            Messages
          </Link>
          <LogOutButton className="nav-link"/>
        </>
      )}
      {/* Always show this link since the about page is not protected */}
      <Link className="nav-link" to="/about">
        About
      </Link>
    </div>
  </div>
);

// Instead of taking everything from state, we just want the user
// object to determine if they are logged in
// if they are logged in, we show them a few more links 
// if you wanted you could write this code like this:
// const mapStateToProps = ({ user }) => ({ user });
const mapStateToProps = state => ({
  userReducer: state.userReducer,
  portfolioReducer: state.portfolioReducer
});

export default connect(mapStateToProps)(Nav);
