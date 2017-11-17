import React from 'react'
import { shallow } from 'enzyme'
import { SingleDatePicker } from 'react-dates';
import moment from 'moment'
import ExpenseForm from '../../components/ExpenseForm'
import expenses from '../fixtures/expenses'

test('should render ExpenseForm corerctly', () => {
  const wrapper = shallow(<ExpenseForm />)
  expect(wrapper).toMatchSnapshot()
})

test('should render ExpenseForm with expense data', () => {
  const wrapper = shallow(<ExpenseForm expense={expenses[1]} />)
  expect(wrapper).toMatchSnapshot()
})

test('should render error for invalid form submission', () => {
  const wrapper = shallow(<ExpenseForm />)
  expect(wrapper).toMatchSnapshot()
  // Pick the only form from page and simulate a submit event
  wrapper.find('form').simulate('submit', {
    preventDefault: () => {}, // Prevent the preventDefault to fuck this test case over
  })
  expect(wrapper.state('error').length).toBeGreaterThan(0)
  expect(wrapper).toMatchSnapshot()
})

test('should set description on input change', () => {
  const value = 'New Description'
  const wrapper = shallow(<ExpenseForm />)
  // Match first input
  wrapper.find('input').at(0).simulate('change', {
    target: { value }, // e.target.value
  })
  expect(wrapper.state('description')).toBe(value)
})

test('should set note on textarea change', () => {
  const value = 'New Note!'
  const wrapper = shallow(<ExpenseForm />)

  wrapper.find('textarea').simulate('change', {
    target: { value },
  })
  expect(wrapper.state('note')).toBe(value)
})

test('should set Amount change if valid input', () => {
  const value = '666.66'
  const wrapper = shallow(<ExpenseForm />)
  // Match first input
  wrapper.find('input').at(1).simulate('change', {
    target: { value }, // e.target.value
  })
  expect(wrapper.state('amount')).toBe(value)
})

test('should not set Amount change in not valid input', () => {
  const value = '666.6666'
  const wrapper = shallow(<ExpenseForm />)
  // Match first input
  wrapper.find('input').at(1).simulate('change', {
    target: { value }, // e.target.value
  })
  expect(wrapper.state('amount')).toBe('')
})

test('should call onSubmit prop for valid form submission', () => {
  const onSubmitSpy = jest.fn() // returns a new spy
  const wrapper = shallow(<ExpenseForm expense={expenses[0]} onSubmit={onSubmitSpy} />)

  wrapper.find('form').simulate('submit', {
    preventDefault: () => {}, // Prevent the preventDefault to fuck this test case over
  })
  expect(wrapper.state('error')).toBe('')
  expect(onSubmitSpy).toHaveBeenCalledWith({
    description: expenses[0].description,
    amount: expenses[0].amount,
    note: expenses[0].note,
    createdAt: expenses[0].createdAt,
  })
})

test('should set new date on date change', () => {
  const now = moment()
  const wrapper = shallow(<ExpenseForm />)
  // finds a component and selects it's prop
  wrapper.find(SingleDatePicker).prop('onDateChange')(now)
  expect(wrapper.state('createdAt')).toEqual(now)
})

test('should set calendar focus onFocusChange', () => {
  const focused = true
  const wrapper = shallow(<ExpenseForm />)
  wrapper.find(SingleDatePicker).prop('onFocusChange')({ focused })
  expect(wrapper.state('calendarFocused')).toBe(focused)
})
