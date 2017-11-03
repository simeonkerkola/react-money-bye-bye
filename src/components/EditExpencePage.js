import React from 'react'

const EditExpencePage = (props) =>  {
  console.log(props);
  return (
    <div>Edit Expense with the id of {props.match.params.id}</div>
  )
}
export default EditExpencePage
