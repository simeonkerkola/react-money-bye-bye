import React from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import selectExpensesTotal from '../selectors/expenses-total'
import selectExpenses from '../selectors/expenses'

export const ExpensesSummary = ({ expenseCount, expensesTotal }) => {
  const expenseWord = expenseCount === 1 ? 'expense' : 'expenses'
  return (
    <div className="page-header">
      <div className="content-container">
        <h2 className="page-header__title">
          Viewing <span>{expenseCount}</span> {expenseWord} totalling <span>{expensesTotal}€</span>
        </h2>
        <div className="page-header__actions">
          <Link className="btn btn--primary" to="/create">Add Expense</Link>
        </div>
      </div>
    </div>
  )
}

const mapStateToProps = (state) => {
  const visibleExpenses = selectExpenses(state.expenses, state.filters)
  return {
    expenseCount: visibleExpenses.length,
    expensesTotal: selectExpensesTotal(visibleExpenses).toFixed(2),
  }
}

export default connect(mapStateToProps)(ExpensesSummary)
