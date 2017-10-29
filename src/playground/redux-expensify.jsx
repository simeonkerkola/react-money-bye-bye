import { createStore, combineReducers } from 'redux'
import uuid from 'uuid'

// ADD_EXPENSE
const addExpense = ({ description = '', note = '', amount = 0, createdAt = 0 } = {}) => ({
  type: 'ADD_EXPENSE',
  expense: {
    id: uuid(),
    description,
    note,
    amount,
    createdAt,
  },
})

// REMOVE_EXPENSE
const removeExpence = ({ id } = {}) => ({
  type: 'REMOVE_EXPENSE',
  id,
})
// EDIT_EXPENSE
const editExpense = (id, updates) => ({
  type: 'EDIT_EXPENSE',
  id,
  updates,
})

// SET_TEXT_FILTER
const setTextFilter = (text = '') => ({
  type: 'SET_TEXT_FILTER',
  text,
})

// SORT_BY_DATE
const sortByDate = () => ({
  type: 'SORT_BY_DATE',
})

// SORT_BY_AMOUNT
const sortByAmount = () => ({
  type: 'SORT_BY_AMOUNT',
})

// SET_START_DATE
const setStartDate = (startDate = undefined) => ({
  type: 'SET_START_DATE',
  startDate,
})

// SET_END_DATE
const setEndDate = (endDate = undefined) => ({
  type: 'SET_END_DATE',
  endDate,
})

const expensesReducerDefaultState = []

const filtersReducerDefaultState = {
  text: '',
  sortBy: 'date',
  startDate: undefined,
  endDate: undefined,
}

// Expenses reducer
const expensesReducer = (state = expensesReducerDefaultState, action) => {
  switch (action.type) {
    case 'ADD_EXPENSE':
      return [
        // Unlike .push(), spread operator or .concat() doesn't change the state
        ...state,
        action.expense,
      ]
    case 'REMOVE_EXPENSE':
      return state.filter(({ id }) => id !== action.id)
    case 'EDIT_EXPENSE':
      return state.map((expense) => {
        if (expense.id === action.id) {
          return {
            ...expense, // Grab all existing properties
            ...action.updates, // Override allproperties we passed down
          }
        }
        return expense
      })
    default:
      return state
  }
}

// Filters reducer
const filtersReducer = (state = filtersReducerDefaultState, action) => {
  switch (action.type) {
    case 'SET_TEXT_FILTER':
      return {
        ...state,
        text: action.text,
      }
    case 'SORT_BY_DATE':
      return {
        ...state,
        sortBy: 'date',
      }
    case 'SORT_BY_AMOUNT':
      return {
        ...state,
        sortBy: 'amount',
      }
    case 'SET_START_DATE':
      return {
        ...state,
        startDate: action.startDate,
      }
    case 'SET_END_DATE':
      return {
        ...state,
        endDate: action.endDate,
      }
    default:
      return state
  }
}

// Get visible expenses
const getVisibleExpenses = (expenses, { text, sortBy, startDate, endDate }) => {
  return expenses.filter((expense) => {
    const startDateMatch = typeof startDate !== 'number' || expense.createdAt >= startDate
    const endDateMatch = typeof endDate !== 'number' || expense.createdAt <= endDate
    const textMatch = expense.description.toLowerCase().includes(text.toLowerCase())

    // If any of these is false, return is false and
    return startDateMatch && endDateMatch && textMatch
  }).sort((a, b) => {
    if (sortBy === 'date') {
      return a.createdAt < b.createdAt ? 1 : -1
    } else if (sortBy === 'amount') {
      return a.amount < b.amount ? 1 : -1
    }
    return 0
  })
}
// Store creation

const store = createStore(
  // key = root state name (expenses) and value is the reducer (expensesReducer) thats
  // supposed to manage that state
  combineReducers({
    expenses: expensesReducer,
    filters: filtersReducer,
  }),
)

store.subscribe(() => {
  const state = store.getState()
  const visibleExpenses = getVisibleExpenses(state.expenses, state.filters)
  console.log(visibleExpenses)
})

const expenceOne = store.dispatch(addExpense({ description: 'Rent', amount: 666, createdAt: 1000 }))
const expenceTwo = store.dispatch(addExpense({ description: 'Coffee', amount: 20000, createdAt: -1000 }))
//
// store.dispatch(removeExpence({ id: expenceOne.expense.id }))
// store.dispatch(editExpense(expenceTwo.expense.id, { amount: 500 }))
//
// store.dispatch(setTextFilter('cof'))
// store.dispatch(setTextFilter())
//
// store.dispatch(sortByAmount())
// store.dispatch(sortByDate())
//
// store.dispatch(setStartDate(-123))
// store.dispatch(setStartDate())
//  store.dispatch(setEndDate(9090))

const demoState = {
  expenses: [
    {
      id: 'sruotyw4er',
      description: 'October Rent',
      note: 'This was the final payment for that address.',
      amount: 66600,
      createdAt: 0,
    },
  ],
  filters: {
    text: 'rent',
    sortBy: 'amount', // date or amount
    startDate: undefined,
    endDate: undefined,
  },
}
