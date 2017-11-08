import moment from 'moment'
import selectExpenses from '../../selectors/expenses'

const expenses = [
  {
    id: '1',
    description: 'Gum',
    note: '',
    amount: 195,
    createdAt: 0,
  },
  {
    id: '2',
    description: 'Rent',
    note: '',
    amount: 19500,
    createdAt: moment(0).add(4, 'days').valueOf(),
  },
  {
    id: '3',
    description: 'Credit Card',
    note: '',
    amount: 4500,
    createdAt: moment(0).subtract(3, 'days').valueOf(), // 4 days after 1/1/70, valueOf() returns a timestamp
  },
]

test('should filter by text value', () => {
  const filters = {
    text: 'e',
    sortBy: 'date',
    startDate: undefined,
    endDate: undefined,
  }
  const result = selectExpenses(expenses, filters)

  // text: 'a' is gonna filter out the first element
  expect(result).toEqual([expenses[1], expenses[2]])
})

test('should filter by startDate', () => {
  const filters = {
    text: '',
    sortBy: 'date',
    startDate: moment(0),
    endDate: undefined,
  }
  const result = selectExpenses(expenses, filters)

  expect(result).toEqual([expenses[1], expenses[0]])
})

test('should filter by endDate', () => {
  const filters = {
    endDate: moment(0).add(2, 'days').valueOf(),
  }
  const result = selectExpenses(expenses, filters)

  expect(result).toEqual([expenses[0], expenses[2]])
})

test('should sort by date', () => {
  expect(selectExpenses(expenses, {})).toEqual([expenses[0], expenses[1], expenses[2]])
})

test('should sort by amount', () => {
  const result = selectExpenses(expenses, { sortBy: 'amount' })
  expect(result).toEqual([expenses[1], expenses[2], expenses[0]])
})
