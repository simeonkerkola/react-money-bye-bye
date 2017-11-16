import React from 'react'
import { shallow } from 'enzyme'
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

test('should set description on input change', () => {
  const value = 'New Description'
  const wrapper = shallow(<ExpenseForm />)
  // Match first input
  wrapper.find('input').at(0).simulate('change', {
    target: { value }, // e.target.value
  })
  expect(wrapper.state('description')).toBe(value)
})
