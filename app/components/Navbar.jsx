import React from 'react';
import { connect } from 'react-redux';
import { Link, browserHistory } from 'react-router';
import Login from './Login'
import WhoAmI from './WhoAmI'
// import { logout as logOutUser } from '../redux/auth';

/* -----------------    COMPONENT     ------------------ */

const Navbar = ({ auth }) => {
  return (
    <nav className="navbar navbar-default myNavbar">
      <div className="container">
        <div className="navbar-header">
          <button
            type="button"
            className="navbar-toggle collapsed"
            data-toggle="collapse"
            data-target=".navbar-collapse">
            <span className="icon-bar" />
            <span className="icon-bar" />
            <span className="icon-bar" />
          </button>
          <Link className="navbar-brand" to="/">OkCollab</Link>
        </div>
        <div id="navbar-links" className="collapse navbar-collapse">
          <ul className="nav navbar-nav">
            <li>
              <Link to="/browse" activeClassName="active">browse</Link>
            </li>
            <li>
              <Link to="/messages" activeClassName="active">messages</Link>
            </li>
            <li>
              {!auth ? null : <Link to={`/users/${auth.id}`} activeClassName="active">my profile</Link>}
            </li>
            <li>
             {!auth ? <Link to="/signup" activeClassName="active">sign up</Link> : null}
            </li>
          </ul>
          <div className="login-navbar">
            {auth ? <WhoAmI /> : <Login />}
          </div>
        </div>
      </div>
    </nav>
  )
}

/* -----------------    CONTAINER     ------------------ */

const mapStateToProps = ({ auth }) => ({ auth })

export default connect(mapStateToProps)(Navbar)

