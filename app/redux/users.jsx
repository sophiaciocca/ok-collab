/*
WHERE I LEFT OFF HERE: Trying to make fetchUserById work, retrieve the user, so that I could pass it in to UserProfile.
But the axios request isn't returning any data! Why???....

*/

import axios from 'axios';

/* -----------------    ACTIONS     ------------------ */

const INITIALIZE = 'INITIALIZE_USERS';
const CREATE        = 'CREATE_USER';
export const REMOVE = 'REMOVE_USER';
const UPDATE        = 'UPDATE_USER';
const SELECT = 'SELECT_USER';


/* ------------   ACTION CREATORS     ------------------ */

const init   = users => ({ type: INITIALIZE, users });
export const create = user => ({ type: CREATE, user });
const remove = id    => ({ type: REMOVE, id });
const update = user  => ({ type: UPDATE, user });
const select = user => ({ type: SELECT, user })


/* ------------       REDUCER     ------------------ */

const initialUsersState = {
    selectedUser: {},
    usersList: []
}

const reducer = (state = initialUsersState, action) => {
  const newState = Object.assign({}, state)
  switch (action.type) {

    case INITIALIZE:
       newState.usersList = action.users;

    // case CREATE:
    //   return [action.user, ...users];

    // case REMOVE:
    //   return users.filter(user => user.id !== action.id);

    // case UPDATE:
    //   return users.map(user => (
    //     action.user.id === user.id ? action.user : user
    //   ));

    case SELECT:
      newState.selectedUser = action.user
      break

    default:
      return state;
  }

  return newState
}


/* ------------       DISPATCHERS     ------------------ */

//get ALL users
export const fetchUsers = () => dispatch => {
  axios.get('/api/users') //this works, fetches all users
       .then(res => {
         dispatch(init(res.data))
       });
};

//get a single user by ID
export const fetchUserById = (id) => dispatch => {
  axios.get(`/api/users/${id}`)
    .then(res => {
      console.log("What is RES in fetchUserById?", res)
      dispatch(select(res.data))
    })
    .catch(err => console.error('Fetching product unsuccessful', err))
}

// optimistic
export const removeUser = id => dispatch => {
  dispatch(remove(id));
  axios.delete(`/api/users/${id}`)
       .catch(err => console.error(`Removing user: ${id} unsuccesful`, err));
};

export const addUser = user => dispatch => {
  axios.post('/api/users', user)
       .then(res => dispatch(create(res.data)))
       .catch(err => console.error(`Creating user: ${user} unsuccesful`, err));
};

export const updateUser = (id, user) => dispatch => {
  axios.put(`/api/users/${id}`, user)
       .then(res => dispatch(update(res.data)))
       .catch(err => console.error(`Updating user: ${user} unsuccesful`, err));
};

export default reducer
