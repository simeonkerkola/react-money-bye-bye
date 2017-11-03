import React from 'react'
import { connect } from 'react-redux'
import { removeExpense } from '../actions/expenses'

const ExpenseListItem = ({ dispatch, id, description, amount, createdAt }) => (
  <div>
    <h3>{description}</h3>
    <p>
      {amount} - {createdAt}
    </p>
    <button
      onClick={() => {
        dispatch(removeExpense({ id }))
        console.log('click')
      }}
    >
      Remove
    </button>
  </div>
)

// connect() doesn't give any values from the state, just an access to dispatch
export default connect()(ExpenseListItem)
