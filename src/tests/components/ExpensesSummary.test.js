import React from 'react'
import { shallow } from 'enzyme'
import { ExpensesSummary } from '../../components/ExpensesSummary'

test('should render ExpensesSummary w/ 1 expense', () => {
  const wrapper = shallow(
    <ExpensesSummary expenseCount={1} expensesTotal={33} />,
  )

  expect(wrapper).toMatchSnapshot()
})

test('should render ExpensesSummary w/ multiple expenses', () => {
  const wrapper = shallow(
    <ExpensesSummary expenseCount={3} expensesTotal={331} />,
  )

  expect(wrapper).toMatchSnapshot()
})
