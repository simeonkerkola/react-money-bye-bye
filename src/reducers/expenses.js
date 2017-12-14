// Expenses reducer
const expensesReducerDefaultState = []

export default (state = expensesReducerDefaultState, action) => {
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
    case 'SET_EXPENSES':
      return action.expenses
    default:
      return state
  }
}
