import React from 'react'

import { logout } from 'APP/app/redux/auth'
import { connect } from 'react-redux'

import Sidebar from './Sidebar'

// <h3>Username: {user && user.name}</h3>

/* -----------------    COMPONENT     ------------------ */

export const UserProfile = ({ user, logout }) => (
  <div id="main">
  {console.log("what is on user????", user)}
    <div className="col-md-2">
      <Sidebar />
    </div>
    {user ?
      <div className="col-md-10">
        <div className="col-md-4 col-sm-6">
          <img className="circle-img" src={user.photoUrl} />
        </div>
        <div className="col-md-8 col-sm-6 user-info">
          <div>
            <h1>{user.name}</h1>
            <h5>{user.city}</h5>
          </div>
          <div>
            <h4>About Me:</h4>
            <p>{user.blurb}</p>
          </div>
          <div>
            <h4>Looking For:</h4>
            <p>{user.lookingFor}</p>
          </div>
          <div>
            <h4>Skills:</h4>
            <h5><span>{user.skills && user.skills.map(skill => { return `${skill}, `})}</span></h5>
          </div>

        </div>
      </div>
      : null}

  </div>
)

/* -----------------    CONTAINER     ------------------ */

const mapStateToProps = ({ users }) => ({
  user: users.selectedUser
})

// const mapDispatchToProps = (dispatch) => {
//   return {
//     handleAddToCart: (cartItem) => {
//       dispatch(addCartItem(cartItem))
//     }
//   }
// }

export default connect(mapStateToProps, null)(UserProfile)


    //