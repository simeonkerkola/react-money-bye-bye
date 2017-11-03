import { createStore, combineReducers } from 'redux'
import expensesReducer from '../reducers/expenses'
import filtersReducer from '../reducers/filters'

export default () => {
  // Store creation

  const store = createStore(
    // key = root state name (expenses) and value is the reducer (expensesReducer) thats
    // supposed to manage that state
    combineReducers({
      expenses: expensesReducer,
      filters: filtersReducer,
    }),
  )

  return store
}
