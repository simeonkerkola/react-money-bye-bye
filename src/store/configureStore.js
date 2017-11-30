import { createStore, combineReducers, applyMiddleware, compose } from 'redux'
import thunk from 'redux-thunk'
import expensesReducer from '../reducers/expenses'
import filtersReducer from '../reducers/filters'

const composeEnchansers = window.__REDUX_DEVTOOLS_EXTENSION__COMPOSE__ || compose

export default () => {
  // Store creation

  const store = createStore(
    // key = root state name (expenses) and value is the reducer (expensesReducer) thats
    // supposed to manage that state
    combineReducers({
      expenses: expensesReducer,
      filters: filtersReducer,
    }),
    composeEnchansers(applyMiddleware(thunk)),
  )

  return store
}
