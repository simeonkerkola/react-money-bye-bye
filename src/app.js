import React from 'react'
import ReactDOM from 'react-dom'
import 'react-dates/initialize'
import 'react-dates/lib/css/_datepicker.css'
import { Provider } from 'react-redux'
import 'normalize.css/normalize.css'
import AppRouter, { history } from './routers/AppRouter'
import configureStore from './store/configureStore'
import { addExpense, startSetExpenses } from './actions/expenses'
import getVisibleExpenses from './selectors/expenses'
import './styles/styles.scss'
import { firebase } from './firebase/firebase'
import { login, logout } from './actions/auth'
import LoadingPage from './components/LoadingPage'

const store = configureStore()

// store.dispatch(addExpense({ description: 'Rent', amount: 666.34, createdAt: 1509397799000 }))
// store.dispatch(addExpense({ description: 'Water Bill', amount: 45.22, createdAt: 1509897799000 }))
// store.dispatch(
//   addExpense({ description: 'Electicity Bill', amount: 78.23, createdAt: 1509667200000 }),
// )

// store.subscribe(() => {
//   const state = store.getState()
//   const visibleExpenses = getVisibleExpenses(state.expenses, state.filters)
//   console.log('testing')
// })

// setTimeout(() => {
//   store.dispatch(setTextFilter('water'))
// }, 3000)

const jsx = (
  // Provider allows us to "provide" a store to all of the components that make up the app
  <Provider store={store}>
    <AppRouter />
  </Provider>
)

// We don't wanna render the whole page again when user clicks login
let hasRendered = false
const renderApp = () => {
  if (!hasRendered) {
    ReactDOM.render(jsx, document.getElementById('app'))
    hasRendered = true
    console.log('Loggin in');
  }
}

ReactDOM.render(<LoadingPage />, document.getElementById('app'))

firebase.auth().onAuthStateChanged((user) => {
  if (user) {
    console.log('Logged in');
    store.dispatch(login(user.uid))
    store.dispatch(startSetExpenses()).then(() => {
      renderApp()

      // Throw user from front page to the dashboard
      if (history.location.pathname === '/') history.push('/dashboard')
    })
  } else {
    console.log('Logged out')
    store.dispatch(logout())
    renderApp()
    history.push('/') // Throws user to the front page
  }
})
