import ExpenseItem from "./ExpenseItem";

function ExpenseList({ expenses = [], onEdit, onDelete }) {
  if (expenses.length === 0) return <p>No Expenses found.</p>;

  return (
    <table border="1" cellPadding="8" cellSpacing="0">
      <thead>
        <tr>
          <th>Date</th>
          <th>Description</th>
          <th>Category</th>
          <th>Amount</th>
          <th>Actions</th>
        </tr>
      </thead>

      <tbody>
        {expenses.map((exp) => (
          <ExpenseItem
            key={exp.id}
            expense={exp}
            onEdit={onEdit}
            onDelete={onDelete}
          />
        ))}
      </tbody>
    </table>
  );
}

export default ExpenseList;
