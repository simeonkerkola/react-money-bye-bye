import React from 'react'
import ReactDOM from 'react-dom'
import 'react-dates/initialize'
import 'react-dates/lib/css/_datepicker.css'
import { Provider } from 'react-redux'
import 'normalize.css/normalize.css'
import AppRouter from './routers/AppRouter'
import configureStore from './store/configureStore'
import { addExpense, startSetExpenses } from './actions/expenses'
import getVisibleExpenses from './selectors/expenses'
import './styles/styles.scss'
import { firebase } from './firebase/firebase'

const store = configureStore()

store.dispatch(addExpense({ description: 'Rent', amount: 666.34, createdAt: 1509397799000 }))
store.dispatch(addExpense({ description: 'Water Bill', amount: 45.22, createdAt: 1509897799000 }))
store.dispatch(addExpense({ description: 'Electicity Bill', amount: 78.23, createdAt: 1509667200000 }))

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

ReactDOM.render(<p>Loading...</p>, document.getElementById('app'))

store.dispatch(startSetExpenses()).then(() => {
  ReactDOM.render(jsx, document.getElementById('app'))
})

firebase.auth().onAuthStateChanged((user) => {
  if (user) {
    console.log('Log in');
  } else {
    console.log('Log out');
  }
})
