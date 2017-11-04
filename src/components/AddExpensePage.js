import React from 'react'
import { connect } from 'react-redux'
import ExpenseForm from './ExpenseForm'
import { addExpense } from '../actions/expenses'

const AddExpensePage = props => (
  <div>
    My add expense component
    <h1>Add Expense</h1>
    <ExpenseForm
      onSubmit={(expense) => {
        props.dispatch(addExpense(expense))
        props.history.push('/') // throws user to mainpage after submit
      }}
    />
  </div>
)
export default connect()(AddExpensePage)
