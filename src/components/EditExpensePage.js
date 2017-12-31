import React from 'react'
import { connect } from 'react-redux'
import Modal from 'react-modal'
import { startEditExpense, startRemoveExpense } from '../actions/expenses'
import ExpenseForm from './ExpenseForm'
import RemoveExpenseModal from './RemoveExpenseModal'

export class EditExpensePage extends React.Component {
  state = {
    readyToBeRemoved: undefined,
  }
  onSubmit = (expense) => {
    this.props.startEditExpense(this.props.expense.id, expense)
    this.props.history.push('/') // throw user to dashboard page
  }

  onRemove = () => {
    this.props.startRemoveExpense({ id: this.props.expense.id })
    this.props.history.push('/')
  }

  onCloseModal = () => {
    this.setState(() => ({ readyToBeRemoved: undefined }))
  }

  askToRemove = (expense) => {
    this.setState(() => ({ readyToBeRemoved: true }))
  }
  render() {
    return (
      <div>
        <div className="page-header">
          <div className="content-container">
            <h2 className="page-header__title">Edit Expense</h2>
          </div>
        </div>
        <div className="content-container">
          <ExpenseForm expense={this.props.expense} onSubmit={this.onSubmit} />
          <button className="btn btn--secondary" onClick={this.askToRemove}>
            Remove
          </button>
        </div>
        <RemoveExpenseModal
          readyToBeRemoved={this.state.readyToBeRemoved}
          closeModal={this.onCloseModal}
          expense={this.props.expense}
          onRemove={this.onRemove}
        />
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
