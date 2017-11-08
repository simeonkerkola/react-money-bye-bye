import { addExpense, editExpense, removeExpense } from '../../actions/expenses'

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
  const expense = {
    description: 'Rent',
    note: 'Nothing',
    amount: 666,
    createdAt: 123456789,
  }
  const action = addExpense(expense)
  expect(action).toEqual({
    type: 'ADD_EXPENSE',
    expense: {
      ...expense,
      id: expect.any(String),
    },
  })
})

test('should set up add expense action object with default values', () => {
  const expense = {}
  const action = addExpense(expense)
  expect(action).toEqual({
    type: 'ADD_EXPENSE',
    expense: {
      id: expect.any(String),
      description: '',
      note: '',
      amount: 0,
      createdAt: 0,
    },
  })
})
