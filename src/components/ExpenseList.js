import React from 'react'
import { connect } from 'react-redux'
import ExpenseListItem from './ExpenseListItem'
import selectExpenses from '../selectors/expenses'
import selectExpensesTotal from '../selectors/expenses-total'

export const ExpenseList = props => (
  <div className="content-container">
    <div className="list-header">
      <div className="show-for-mobile">Expenses</div>
      <div className="show-for-desktop">Expense</div>
      <div className="show-for-desktop">Amount</div>
    </div>

    <div className="list-body">
      {props.expenses.length === 0 ? (
        <div className="list-item list-item--message">
          <span>No expenses</span>
        </div>
      ) : (
        (console.log('props.expenses', props.expenses),
          props.expenses.map(expense => <ExpenseListItem key={expense.id} {...expense} />))
      )}
    </div>

    {props.expenses.length > 0 && (
      <div className="list-footer">
        <div className="show-for-mobile">
          {props.expenseCount} in total make {props.expensesTotal}€
        </div>
        <div className="show-for-desktop">Total: {props.expenseCount}</div>
        <div className="show-for-desktop">{props.expensesTotal}€</div>
      </div>
    )}
  </div>
)

const mapStateToProps = (state) => {
  const visibleExpenses = selectExpenses(state.expenses, state.filters)
  return {
    expenses: selectExpenses(state.expenses, state.filters),
    expenseCount: visibleExpenses.length,
    expensesTotal: selectExpensesTotal(visibleExpenses).toFixed(2),
  }
}

export default connect(mapStateToProps)(ExpenseList)
