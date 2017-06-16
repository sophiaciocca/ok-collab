import React from 'react'
import { Link } from 'react-router'
import { connect } from 'react-redux'

import Sidebar from './Sidebar'

/* -----------------    COMPONENT     ------------------ */

const UserList = ({ usersList }) => (
  <div id="main">
    <div className="col-xs-2">
      <Sidebar />
    </div>
    <div className="col-xs-10">
      <div className="row">
        {
          usersList.map(user => {
            return (
              <div className="col-xs-4" key={user.id}>
                <Link className="thumbnail" to={`/users/${user.id}`}>
                  <img className="user-img" src={user.photoUrl} />
                  <div className="caption text-center">
                    <h4>
                      <span><strong>{user.name}</strong> || {user.city}</span>
                    </h4>
                    <h6>
                      <span>{user.skills.map(skill => {
                        return `${skill}, `
                      })}</span>
                    </h6>
                  </div>
                </Link>
              </div>
              )
          })
        }
      </div>
    </div>
  </div>

)

/* -----------------    CONTAINER     ------------------ */

const mapStateToProps = ({ users }) => ({ usersList: users.usersList })

export default connect(mapStateToProps)(UserList)
