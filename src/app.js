import React from 'react'
import ReactDOM from 'react-dom'
import 'react-dates/initialize'
import 'react-dates/lib/css/_datepicker.css'
import { Provider } from 'react-redux'
import 'normalize.css/normalize.css'
import AppRouter from './routers/AppRouter'
import configureStore from './store/configureStore'
import { addExpense } from './actions/expenses'
import getVisibleExpenses from './selectors/expenses'
import './styles/styles.scss'

const store = configureStore()

console.log('testing');

// store.dispatch(addExpense({ description: 'Rent', amount: 666, createdAt: -1188899994 }))
store.dispatch(addExpense({ description: 'Water Bill', amount: 45, createdAt: 1509897799000 }))
// store.dispatch(addExpense({ description: 'Electicity Bill', amount: 78, createdAt: 1509667200000 }))

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

ReactDOM.render(jsx, document.getElementById('app'))
