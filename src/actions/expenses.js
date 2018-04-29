import uuid from 'uuid'
import database from '../firebase/firebase'

// ADD_EXPENSE
export const addExpense = expense => ({
  type: 'ADD_EXPENSE',
  expense,
})

export const startAddExpense = (expenseData = {}) =>
  // Returning a function on Redux wouldn't work on default, need redux-thunk
  (dispatch, getState) => {
    console.log(getState())
    const uid = getState().auth.uid
    const { description = '', note = '', amount = 0, createdAt = 0 } = expenseData // Destructure from expenseData
    const expense = { description, note, amount, createdAt }

    return database
      .ref(`users/${uid}/expenses`)
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

export const setModelExpenses = expenseData => dispatch =>
  dispatch(startAddExpense(expenseData)).then(() => dispatch(startSetExpenses()))

// REMOVE_EXPENSE
export const removeExpense = ({ id } = {}) => ({
  type: 'REMOVE_EXPENSE',
  id,
})

export const startRemoveExpense = ({ id }) => (dispatch, getState) => {
  const uid = getState().auth.uid
  return database
    .ref(`users/${uid}/expenses/${id}`)
    .remove()
    .then(() => {
      dispatch(removeExpense({ id }))
    })
    .catch(err => console.log(err.message))
}

// EDIT_EXPENSE
export const editExpense = (id, updates) => ({
  type: 'EDIT_EXPENSE',
  id,
  updates,
})

export const startEditExpense = (id, updates) => (dispatch, getState) => {
  const uid = getState().auth.uid
  return database
    .ref(`users/${uid}/expenses/${id}`)
    .update(updates)
    .then(() => dispatch(editExpense(id, updates)))
    .catch(err => console.log(err.message))
}

// SET_EXPENSES
export const setExpenses = expenses => ({
  type: 'SET_EXPENSES',
  expenses,
})

export const startSetExpenses = () => (dispatch, getState) => {
  const uid = getState().auth.uid
  return database
    .ref(`users/${uid}/expenses`)
    .once('value')
    .then((snapshot) => {
      const expenses = []
      snapshot.forEach((childSnapshot) => {
        console.log(expenses)
        expenses.push({
          id: childSnapshot.key, // value of automatically generated id
          ...childSnapshot.val(), // push everything else as well
        })
      })
      return dispatch(setExpenses(expenses))
    })
}
