import React from 'react'
import { NavLink, Link } from 'react-router-dom'
import { connect } from 'react-redux'
import { startLogout } from '../actions/auth'

export const Header = ({ startLogout }) => (
  <header className="header">
    <div className="content-container">
      <div className="header__content">
        {/* <NavLink to="/" activeClassName="is-active" exact>Home</NavLink> */}
        <Link className="header__title" to="/dashboard">
          <h1>Expensify</h1>
        </Link>
        <div className="header__actions">
          <NavLink className="btn header__actions__item" to="/help" activeClassName="is-active">Help</NavLink>
          <button className="btn header__actions__item" onClick={startLogout}>Logout</button>
        </div>
      </div>
    </div>
  </header>
)

const mapDispatchToProps = dispatch => ({
  startLogout: () => dispatch(startLogout()),
})

export default connect(undefined, mapDispatchToProps)(Header)
