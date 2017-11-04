import React from 'react'
import { connect } from 'react-redux'
import { editExpense, removeExpense } from '../actions/expenses'
import ExpenseForm from './ExpenseForm'

const EditExpencePage = props => (
  <div>
    <ExpenseForm
      expense={props.expense}
      onSubmit={(expense) => {
        props.dispatch(editExpense(props.expense.id, expense))
        props.history.push('/') // throw user to dashboard page
      }}
    />
    <button
      onClick={() => {
        props.dispatch(removeExpense({ id: props.expense.id }))
        props.history.push('/')
        console.log('click')
      }}
    >
      Remove
    </button>
  </div>
)

const mapStateToProps = (state, props) => ({
  expense: state.expenses.find(expense => expense.id === props.match.params.id),
})

export default connect(mapStateToProps)(EditExpencePage)
