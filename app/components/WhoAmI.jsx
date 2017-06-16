import React from 'react'
import { Link, browserHistory } from 'react-router';

export const WhoAmI = ({ user, logout }) => (
  <div className="whoami">
    <span className="navbar-photo">{user && <img className="navbar-img" src={user.photoUrl} />}</span>
    <span className="whoami-user-name">{user && user.name}</span>
    <button className="btn btn-sm login-button" onClick={logout}>Logout</button>
  </div>
)

import {logout} from 'APP/app/redux/auth'
import {connect} from 'react-redux'

export default connect(
  ({ auth }) => ({ user: auth }),
  {logout},
)(WhoAmI)
