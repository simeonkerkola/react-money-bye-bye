import { createStore, combineReducers } from "redux"

// ADD_EXPENSE
// REMOVE_EXPENSE
// EDIT EXPENCE
// SET_TEXT_FILTER
// SORT_BY_DATE
// SORT_BY_AMOUNT
// SET_START_DATE
// SET_END_DATE

const expensesReducerDefaultState = []
const filtersReducerDefaultState = {
  text: "",
  sortBy: "date",
  startDate: undefined,
  endDate: undefined
}

// Expenses reducer
const expensesReducer = (state = expensesReducerDefaultState, action) => {
  switch (action.type) {
    default:
      return state
  }
}

// Filters reducer
const filtersReducer = (state = filtersReducerDefaultState, action) => {
  switch (action.type) {
    default:
      return state
  }
}

// Store creation

const store = createStore(
  // key = root state name (expenses) and value is the reducer (expensesReducer)
  // thats supposed to manage that
  combineReducers({
    expenses: expensesReducer,
    filters: filtersReducer,
  })
)

console.log(store.getState())

const demoState = {
  expenses: [
    {
      id: "sruotyw4er",
      description: "October Rent",
      note: "This was the final payment for that address.",
      amount: 66600,
      createdAt: 0
    }
  ],
  filters: {
    text: "rent",
    sortBy: "amount", // date or amount
    startDate: undefined,
    endDate: undefined
  }
}
