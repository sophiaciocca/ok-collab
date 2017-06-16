'use strict'
import React from 'react'
import {Router, Route, IndexRedirect, IndexRoute, browserHistory} from 'react-router'
import {render} from 'react-dom'
import {connect, Provider} from 'react-redux'

import Root from './components/Root'
import UserProfile from './components/UserProfile'
import UserList from './components/UserList'
import MessageList from './components/MessageList'
import NotFound from './components/NotFound'
// import Sidebar from './components/Sidebar'
// import Signup from './components/Signup'
// import About from './components/About'

// import { fetchProducts, fetchProductById, fetchProductsByCategoryId } from './redux/products'
import { fetchUsers, fetchUserById } from './redux/users'
import { fetchCategories } from './redux/categories'
import { retrieveLoggedInUser } from './redux/auth';

const Routes = ({fetchInitialData, onUserEnter, onCategoryEnter, onCheckoutEnter}) => (
  <Router history={browserHistory}>
    <Route path="/" component={Root} onEnter={fetchInitialData}>
      <IndexRedirect to="/browse" />
      <Route path="/browse" component={UserList} />
      <Route path="/users/:userId" component={UserProfile} onEnter={onUserEnter}/>
      <Route path="/messages" component={MessageList}/>
    </Route>
    <Route path='*' component={NotFound} />
  </Router>
)

/* -----------------    CONTAINER     ------------------ */

const mapStateToProps = null

const mapDispatchToProps = dispatch => ({
  fetchInitialData: () => {
    // dispatch(retrieveLoggedInUser())
    dispatch(fetchUsers())
    // dispatch(fetchCategories())
  },
  onUserEnter: (nextRouterState) => {
    let userId = nextRouterState.params.userId
    dispatch(fetchUserById(userId)) // dispatches specific reducer that does axios request w/ productId of clicked-on product
  },
  // onCategoryEnter: (nextRouterState) => {
  //   const categoryId = nextRouterState.params.categoryId
  //   dispatch(fetchProductsByCategoryId(categoryId))
  // }
})

export default connect(mapStateToProps, mapDispatchToProps)(Routes)

