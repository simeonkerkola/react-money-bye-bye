import React from 'react'
import Modal from 'react-modal'
import moment from 'moment'

const RemoveExpenseModal = props => (
  <Modal
    isOpen={!!props.removableExpense} // !! converts string to true, and undef to false
    onRequestClose={props.closeModal} // close the modal w/ esc
    contentLabel="Remove Expense"
    closeTimeoutMS={200}
    className="modal"
  >
    <h3>Are you sure you want to remove this expense?</h3>
    <p>
      {props.expense.description}, {props.expense.amount}€, {moment(props.expense.createdAt).format('Do MMM YY')}
    </p>
    <button className="btn btn--modal btn--negative" onClick={props.closeModal}>
      No
    </button>
    <button className="btn btn--modal btn--positive" onClick={props.onRemove}>
      Yes
    </button>
  </Modal>
)

export default RemoveExpenseModal
