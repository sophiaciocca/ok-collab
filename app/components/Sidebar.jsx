import React from 'react'
import { Link } from 'react-router'
import { connect } from 'react-redux'

/* -----------------    COMPONENT     ------------------ */

const Sidebar = ({categoryList}) => {
  return (
    <sidebar>
      <section>
        <h4>Filter By:</h4>
      </section>
      <hr />
      <ul className="list-unstyled">
        <li><Link to="/browse">All</Link></li>
        <li><Link to="#">By City:</Link></li>
        <li><Link to="#">By Skill:</Link></li>
      </ul>
    </sidebar>
  )
}

/* -----------------    CONTAINER     ------------------ */

// TODO: link /products/categoryId to filtered version of productList page

const mapStateToProps = ({categories}) => ({categoryList: categories.categoryList})

export default connect(mapStateToProps)(Sidebar)

/* (Category List Mapping from Grace Shopper)
        {
          categoryList.map(category => {
            return (
              <li key={category.id}>
                <Link to={`/categories/${category.id}`}>{category.title}</Link>
              </li>
            )
          })
        }

        */
