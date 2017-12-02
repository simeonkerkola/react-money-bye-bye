import uuid from 'uuid'
import database from '../firebase/firebase'

// ADD_EXPENSE
export const addExpense = expense => ({
  type: 'ADD_EXPENSE',
  expense,
})

export const startAddExpense = (expenseData = {}) =>
  // Returning a function on Redux wouldn't work on default, need redux-thunk
  (dispatch) => {
    const { description = '', note = '', amount = 0, createdAt = 0 } = expenseData // Destructure from expenseData
    const expense = { description, note, amount, createdAt }

    return database
      .ref('expenses')
      .push(expense)
      .then((ref) => {
        dispatch(
          addExpense({
            id: ref.key,
            ...expense,
          }),
        )
      })
  }


// REMOVE_EXPENSE
export const removeExpense = ({ id } = {}) => ({
  type: 'REMOVE_EXPENSE',
  id,
})
// EDIT_EXPENSE
export const editExpense = (id, updates) => ({
  type: 'EDIT_EXPENSE',
  id,
  updates,
})
