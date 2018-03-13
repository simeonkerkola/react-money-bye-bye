import React from 'react'
import { connect } from 'react-redux'
import { startLogin, startAnonymousLogin } from '../actions/auth'

export const LoginPage = ({ startLogin, startAnonymousLogin }) => (
  <div className="box-layout">
    <div className="box-layout__box">
      <h1 className="box-layout__title">Expensify</h1>
      <p>Get your expenses under control</p>
      <p>
        <button className="btn btn--primary" onClick={startLogin}>
          Login with Google
        </button>
      </p>
      <p>
        <button className="btn btn--secondary" onClick={startAnonymousLogin}>
          Try Out
        </button>
      </p>
    </div>
  </div>
)

const mapDispatchToProps = dispatch => ({
  startLogin: () => dispatch(startLogin()),
  startAnonymousLogin: () => dispatch(startAnonymousLogin()),
})

export default connect(undefined, mapDispatchToProps)(LoginPage)
