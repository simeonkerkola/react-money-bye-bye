import React from 'react'
import ExpenseList from './ExpenseList.jsx'
import ExpenseListFilters from './ExpenseListFilters.jsx'

const ExpenseDashboardPage = (props) => (
  <div>
    <ExpenseListFilters />
    <ExpenseList />
  </div>
)

export default ExpenseDashboardPage
