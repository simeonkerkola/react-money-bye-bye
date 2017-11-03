import React from 'react'

export default class ExpenseForm extends React.Component {
  state = {
    description: '',
    note: '',
    amount: '',
  }

  onDescriptionChange = e => {
    const description = e.target.value
    this.setState(() => ({ description }))
  }
  onNoteChange = e => {
    const note = e.target.value
    this.setState(() => ({ note }))
  }
  onAmountChange = e => {
    const amount = e.target.value
    if (amount.match(/^\d*(\.\d{0,2})?$/)) {
        this.setState(() => ({ amount }))
    }
}
  render() {
    return (
      <div>
        <form action="">
          <input
            type="text"
            placeholder="Description"
            value={this.state.description}
            onChange={this.onDescriptionChange}
            autoFocus
          />
          <input
            type="text"
            placeholder="Amount"
            value={this.state.amount}
            onChange={this.onAmountChange}
          />
          <textarea
            cols="30"
            rows="4"
            placeholder="Add a note"
            value={this.state.note}
            onChange={this.onNoteChange}
          />
          <button>Add Expense</button>
        </form>
      </div>
    )
  }
}
