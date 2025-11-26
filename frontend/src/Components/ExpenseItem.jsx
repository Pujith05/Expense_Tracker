import React from "react";

function ExpenseItem({ expense, onEdit, onDelete }) {
  return (
    <tr>
      <td>{expense.expense_date}</td>
      <td>{expense.description}</td>
      <td>{expense.category}</td>
      <td>{expense.amount}</td>
      <td>
        <button onClick={() => onEdit(expense)}>Edit</button>
        <button onClick={() => onDelete(expense.id)}>Delete</button>
      </td>
    </tr>
  );
}

export default ExpenseItem;
