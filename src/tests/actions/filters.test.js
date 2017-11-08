import moment from 'moment'
import {
  setStartDate,
  setEndDate,
  setTextFilter,
  sortByAmount,
  sortByDate,
} from '../../actions/filters'

test('should generate set start date action object', () => {
  const action = setStartDate(moment(0))
  expect(action).toEqual({
    type: 'SET_START_DATE',
    startDate: moment(0),
  })
})

test('should generate set end date action object', () => {
  const action = setEndDate(moment(0))
  expect(action).toEqual({
    type: 'SET_END_DATE',
    endDate: moment(0),
  })
})

test('should generate set text filter object with text value', () => {
  const action = setTextFilter('Some filter')
  expect(action).toEqual({
    type: 'SET_TEXT_FILTER',
    text: 'Some filter',
  })
})

test('should generate a filter by amount action object', () => {
  expect(sortByAmount()).toEqual({ type: 'SORT_BY_AMOUNT' })
})

test('should generate a filter by date action object', () => {
  expect(sortByDate()).toEqual({ type: 'SORT_BY_DATE' })
})
