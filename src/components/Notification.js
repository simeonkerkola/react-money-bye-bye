import React from 'react'
import { firebase } from '../firebase/firebase'

const Notification = () => {
  const user = firebase.auth().currentUser
  return (
    <div>
      {user.isAnonymous && (
        <div className="notification">
          You are logged in as Anonymous, clicking Logout will remove all your saved data
        </div>
      )}
    </div>
  )
}

export default Notification
