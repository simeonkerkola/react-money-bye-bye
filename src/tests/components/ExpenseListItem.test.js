import React from 'react'
import { shallow } from 'enzyme'
import expenses from '../fixtures/expenses'
import ExpenseListItem from '../../components/ExpenseListItem'

test('should render ExpenseListItem with fixture data', () => {
  const wrapper = shallow(
    <ExpenseListItem
      // Get the first object in an array and speread it out
      {...expenses[0]}
    />,
  )

  expect(wrapper).toMatchSnapshot()
})
