import { combineReducers } from 'redux'

const rootReducer = combineReducers({
  auth: require('./auth').default,
  products: require('./products').default,
  categories: require('./categories').default,
  users: require('./users').default
})

export default rootReducer
