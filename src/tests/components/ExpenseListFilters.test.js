import React from 'react'
import moment from 'moment'
import { shallow } from 'enzyme'
import { DateRangePicker } from 'react-dates'
import { filters, altFilters } from '../fixtures/filters'
import { ExpenseListFilters } from '../../components/ExpenseListFilters'

let setTextFilter
let sortByDate
let sortByAmount
let setStartDate
let setEndDate
let wrapper

beforeEach(() => {
  setTextFilter = jest.fn()
  sortByDate = jest.fn()
  sortByAmount = jest.fn()
  setStartDate = jest.fn()
  setEndDate = jest.fn()
  wrapper = shallow(
    <ExpenseListFilters
      filters={filters}
      setTextFilter={setTextFilter}
      sortByDate={sortByDate}
      sortByAmount={sortByAmount}
      setStartDate={setStartDate}
      setEndDate={setEndDate}
    />,
  )
})

test('should render ExpenseListFilters correctly', () => {
  expect(wrapper).toMatchSnapshot()
})

test('should render ExpenseListFilters w/ alt data correctly', () => {
  wrapper.setProps({
    filters: altFilters,
  })
  expect(wrapper).toMatchSnapshot()
})

test('should handle text change', () => {
  const value = 'bill'
  wrapper.find('input').simulate('change', {
    target: {
      value, // e.target.value
    },
  })
  expect(setTextFilter).toHaveBeenLastCalledWith(value)
})

test('should sort by date', () => {
  const value = 'date'
  wrapper.find('select').simulate('change', {
    target: { value },
  })
  expect(sortByDate).toHaveBeenCalled()
})

test('should sort by amount', () => {
  const value = 'amount'
  wrapper.find('select').simulate('change', {
    target: { value },
  })
  expect(sortByAmount).toHaveBeenCalled()
})

test('should handle date changes', () => {
  const startDate = moment(0).add(4, 'years')
  const endDate = moment(0).add(8, 'years')
  wrapper.find(DateRangePicker).prop('onDatesChange')({ startDate, endDate })
  expect(setStartDate).toHaveBeenCalledWith(startDate)
  expect(setEndDate).toHaveBeenCalledWith(endDate)
})

test('should handle date focus change', () => {
  const focused = 'endDate'
  wrapper.find(DateRangePicker).prop('onFocusChange')(focused)
  expect(wrapper.state('calendarFocused')).toBe(focused)
})
