import React from 'react'
import { connect } from 'react-redux'
import selectExpensesTotal from '../selectors/expenses-total'
import selectExpenses from '../selectors/expenses'

export const ExpensesSummary = ({ expenseCount, expensesTotal }) => {
  const expenseWord = expenseCount === 1 ? 'expense' : 'expenses'
  return (
    <div>
      <h1>
        {expenseCount} {expenseWord} totalling {expensesTotal}€
      </h1>
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
