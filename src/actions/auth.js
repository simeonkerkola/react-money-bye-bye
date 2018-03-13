import { firebase, googleAuthProvider } from '../firebase/firebase'

export const login = uid => ({
  type: 'LOGIN',
  uid,
})

export const startLogin = () => () => firebase.auth().signInWithPopup(googleAuthProvider)

export const startAnonymousLogin = () => () => firebase.auth().signInAnonymously()

export const logout = () => ({ type: 'LOGOUT' })

export const startLogout = () => () => {
  const user = firebase.auth().currentUser
  if (user.isAnonymous) {
    const ref = firebase.database().ref(`users/${user.uid}`)
    ref
      .remove()
      .then(() => {
        user.delete()
      })
      .catch(() => console.log('didnt delete!'))
  }
  return firebase.auth().signOut()
}
