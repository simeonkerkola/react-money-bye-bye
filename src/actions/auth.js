import { firebase, googleAuthProvider } from '../firebase/firebase'
import { startAddExpense } from './expenses'

export const login = uid => ({
  type: 'LOGIN',
  uid,
})

export const startLogin = () => () => firebase.auth().signInWithPopup(googleAuthProvider)

export const startAnonymousLogin = () => (dispatch, getState) => {
  console.log(dispatch)
  return firebase
    .auth()
    .signInAnonymously()
    .then((user) => {
      console.log('uid', user.uid)
      console.log('state', getState())

      return Promise.resolve()
    })
    .then(() =>
      dispatch(startAddExpense({ description: 'Rent', amount: 444, createdAt: Date.now() }))
    )
    .catch(e => console.log('didnt populate', e))
}
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
