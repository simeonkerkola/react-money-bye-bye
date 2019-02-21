import React from 'react'
import ReactDOM from 'react-dom'
import 'react-dates/initialize'
import 'react-dates/lib/css/_datepicker.css'
import { Provider } from 'react-redux'
import 'normalize.css/normalize.css'
import AppRouter, { history } from './routers/AppRouter'
import configureStore from './store/configureStore'
import { startAddExpense, startSetExpenses } from './actions/expenses'
import './styles/styles.scss'
import { firebase } from './firebase/firebase'
import { login, logout } from './actions/auth'
import LoadingPage from './components/LoadingPage'

const store = configureStore()

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
  }
}

ReactDOM.render(<LoadingPage />, document.getElementById('app'))

firebase.auth().onAuthStateChanged((user) => {
  if (user) {
    const { isAnonymous } = user
    store.dispatch(login(user.uid))
    if (isAnonymous) renderApp()
    else store.dispatch(startSetExpenses()).then(() => {
      renderApp()

      // Add some stock data for Anonymous users
      // if (user.isAnonymous && !hasRendered) {
      //   store.dispatch(startAddExpense({ description: 'Rent', amount: 666, createdAt: Date.now() }))
      //   store.dispatch(
      //     startAddExpense({
      //       description: 'Groceries',
      //       amount: 15.2,
      //       createdAt: Date.now() - 604800000,
      //     }),
      //   )
      //   store.dispatch(
      //     startAddExpense({
      //       description: 'Water Bill',
      //       amount: 22.22,
      //       createdAt: Date.now() - 1004800000,
      //     }),
      //   )
      // }

      // Throw user from front page to the dashboard
      if (history.location.pathname === '/') history.push('/dashboard')
    })
  } else {
    store.dispatch(logout())
    renderApp()
    history.push('/') // Throws user to the front page
  }
})
