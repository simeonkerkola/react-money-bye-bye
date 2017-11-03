// Higher Ordrer Component - component that renders another component

import React from 'react'
import ReactDOM from 'react-dom'

const { string } = React.PropTypes

const Info = props => (
  <div>
    <h1>INFO</h1>
    <p>The info is: {props.info}</p>
  </div>
)

// requireAuthentication
const requireAuthentication = WrappedComponent => props => (
  <div>
    {props.isAuthenticated ? (
      <div>
        <p> You are logged in!</p>
        {/* Taking all the props passing to this higher order component and just passing them
              directly to the child */}
        <WrappedComponent {...props} />
      </div>
    ) : (
      <p>please log in</p>
    )}
  </div>
)

const AuthInfo = requireAuthentication(Info)

Info.propTypes = { info: string.isRequired }
ReactDOM.render(
  <AuthInfo isAuthenticated={false} info="This is the info" />,
  document.getElementById('app'),
)
