import React from 'react'
import Modal from 'react-modal'
import moment from 'moment'

const RemoveExpenseModal = props => (
  <Modal
    isOpen={!!props.readyToBeRemoved} // !! converts string to true, and undef to false
    onRequestClose={props.closeModal} // close the modal w/ esc
    contentLabel="Remove Expense"
    closeTimeoutMS={200}
    className="modal"
  >
    <h3 className="modal__title">Are you sure you want to remove this expense?</h3>
    <div className="modal__body">
      <p>
        {props.expense.description}, {props.expense.amount}€
      </p>
    </div>
    <button className="modal__btn btn btn--quiet" onClick={props.closeModal}>
      No
    </button>
    <button className="modal__btn btn btn--negative" onClick={props.onRemove}>
      Yes
    </button>
  </Modal>
)

export default RemoveExpenseModal
