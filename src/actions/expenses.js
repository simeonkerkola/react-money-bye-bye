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

export const startRemoveExpense = ({ id }) => dispatch =>
  database
    .ref(`expenses/${id}`)
    .remove()
    .then(() => {
      dispatch(removeExpense({ id }))
    })
    .catch(err => console.log(err.message))

// EDIT_EXPENSE
export const editExpense = (id, updates) => ({
  type: 'EDIT_EXPENSE',
  id,
  updates,
})

// SET_EXPENSES
export const setExpenses = expenses => ({
  type: 'SET_EXPENSES',
  expenses,
})

export const startSetExpenses = () => dispatch =>
  database
    .ref('expenses')
    .once('value')
    .then((snapshot) => {
      const expenses = []
      snapshot.forEach((childSnapshot) => {
        expenses.push({
          id: childSnapshot.key, // value of automatically generated id
          ...childSnapshot.val(), // push everything else as well
        })
      })
      dispatch(setExpenses(expenses))
    })
