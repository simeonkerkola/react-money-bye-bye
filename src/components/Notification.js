import React from 'react'
import { firebase } from '../firebase/firebase'

const Notification = () => {
  const user = firebase.auth().currentUser
  return (
    <div className="notification">
      {user.isAnonymous && (
        <div>You are logged in as anonymous, clicking Logout will remove all your saved data</div>
      )}
    </div>
  )
}

export default Notification
