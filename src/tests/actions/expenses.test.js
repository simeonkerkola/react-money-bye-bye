import configureMockStore from 'redux-mock-store'
import thunk from 'redux-thunk'
import { startAddExpense, addExpense, editExpense, removeExpense, startSetExpenses, setExpenses } from '../../actions/expenses'
import expenses from '../fixtures/expenses'
import database from '../../firebase/firebase'

// have to provide our thunk middleware to mock store
const createMockStore = configureMockStore([thunk])

beforeEach((done) => {
  const expensesData = {}
  expenses.forEach(({ id, description, note, amount, createdAt }) => {
    expensesData[id] = { description, note, amount, createdAt }
  })
  database
    .ref('expenses')
    .set(expensesData)
    .then(
      () => done(), // Make sure no test cases run before this
    )
})

test('should set up remove expense action object', () => {
  const action = removeExpense({ id: '123abc' })
  expect(action).toEqual({
    // use toEqual() to compare objects
    type: 'REMOVE_EXPENSE',
    id: '123abc',
  })
})

test('should set up edit expense object', () => {
  const action = editExpense('abc123', { date: 666 })
  expect(action).toEqual({
    type: 'EDIT_EXPENSE',
    id: 'abc123',
    updates: {
      date: 666,
    },
  })
})

test('should setup add expense action object with provided values,', () => {
  const action = addExpense(expenses[1])
  expect(action).toEqual({
    type: 'ADD_EXPENSE',
    expense: expenses[1],
  })
})

test('should add expense to database and store', (done) => {
  const store = createMockStore({})
  const expenseData = {
    description: 'Groceries',
    amount: 10,
    note: '',
    createdAt: 1000,
  }

  store
    .dispatch(startAddExpense(expenseData))
    .then(() => {
      const actions = store.getActions() // our mock store actions
      expect(actions[0]).toEqual({
        type: 'ADD_EXPENSE',
        expense: {
          id: expect.any(String),
          ...expenseData,
        },
      })

      return database.ref(`expenses/${actions[0].expense.id}`).once('value')
    })
    .then((snapshot) => {
      expect(snapshot.val()).toEqual(expenseData)
      done() // Wait for the first callback to run, then wait for this, and done
    })
})

test('should set up add expense with defaults to database store', (done) => {
  const store = createMockStore({})
  const expenseData = {}

  store
    .dispatch(startAddExpense(expenseData))
    .then(() => {
      const actions = store.getActions()
      expect(actions[0]).toEqual({
        type: 'ADD_EXPENSE',
        expense: {
          id: expect.any(String),
          description: '',
          note: '',
          amount: 0,
          createdAt: 0,
        },
      })
      return database.ref(`expenses/${actions[0].expense.id}`).once('value')
    })
    .then((snapshot) => {
      expect(snapshot.val()).toBeTruthy()
      done()
    })
})

test('should setup set expense action object with data', () => {
  const action = setExpenses(expenses)
  expect(action).toEqual({
    type: 'SET_EXPENSES',
    expenses,
  })
})

test('should fetch expenses from firebase', (done) => {
  const store = createMockStore({})
  store.dispatch(startSetExpenses()).then(() => {
    const actions = store.getActions()
    expect(actions[0]).toEqual({
      type: 'SET_EXPENSES',
      expenses,
    })
    done()
  })
})
