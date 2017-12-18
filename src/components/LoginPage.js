import React from 'react'
import { connect } from 'react-redux'
import { startLogin } from '../actions/auth'

export const LoginPage = ({ onStartLogin }) => (
  <div>
    <p>Login please</p>
    <button onClick={onStartLogin}>Log in</button>
  </div>
)

const mapDispatchToProps = dispatch => ({
  onStartLogin: () => dispatch(startLogin()),
})

export default connect(undefined, mapDispatchToProps)(LoginPage)
