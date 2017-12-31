import React from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import selectExpenses from '../selectors/expenses'

export const ExpensesSummary = ({ expenseCount, visibleExpenseCount }) => {
  const expenseWord = visibleExpenseCount === 1 ? 'expense' : 'expenses'
  return (
    <div className="page-header">
      <div className="content-container">
        <h2 className="page-header__title">
          Viewing <span>{visibleExpenseCount}</span> {expenseWord}
          {expenseCount > 0 && <div> of <span>{expenseCount}</span></div>}
        </h2>
        <div className="page-header__actions">
          <Link className="btn btn--primary" to="/create">
            Add Expense
          </Link>
        </div>
      </div>
    </div>
  )
}

const mapStateToProps = (state) => {
  const visibleExpenses = selectExpenses(state.expenses, state.filters)
  return {
    expenseCount: state.expenses.length,
    visibleExpenseCount: visibleExpenses.length,
  }
}

export default connect(mapStateToProps)(ExpensesSummary)
