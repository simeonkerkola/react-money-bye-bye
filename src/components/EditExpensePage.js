import React from 'react'
import { connect } from 'react-redux'
import { startEditExpense, startRemoveExpense } from '../actions/expenses'
import ExpenseForm from './ExpenseForm'

export class EditExpensePage extends React.Component {
  onSubmit = (expense) => {
    this.props.startEditExpense(this.props.expense.id, expense)
    this.props.history.push('/') // throw user to dashboard page
  }
  onRemove = () => {
    this.props.startRemoveExpense({ id: this.props.expense.id })
    this.props.history.push('/')
  }

  render() {
    return (
      <div>
        <ExpenseForm expense={this.props.expense} onSubmit={this.onSubmit} />
        <button onClick={this.onRemove}>Remove</button>
      </div>
    )
  }
}

const mapStateToProps = (state, props) => ({
  expense: state.expenses.find(expense => expense.id === props.match.params.id),
})
const mapDispatchToProps = dispatch => ({
  startEditExpense: (id, changes) => dispatch(startEditExpense(id, changes)),
  startRemoveExpense: id => dispatch(startRemoveExpense(id)),
})

export default connect(mapStateToProps, mapDispatchToProps)(EditExpensePage)
