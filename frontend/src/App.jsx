import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import axios from 'axios'
import ExpenseForm from './Components/ExpenseForm.jsx'
import ExpenseList from './Components/ExpenseList.jsx'
import { useEffect } from 'react'

function App() {
  const [expenses, setExpenses] = useState([]);
  const [editingExpense, setEditingExpense] = useState(null);
  const [initialBalance, setInitialBalance] = useState();
  const [remainingBalance, setRemainingBalance] = useState(initialBalance);

  const fetchExpenses = async()=>{
    const res = await axios.get('http://localhost:5000/expenses');
    setExpenses(res.data);
  };

  useEffect(()=>{
    fetchExpenses();
  }, []);

  useEffect(()=>{
    const totalExpenses = expenses.reduce((total, exp)=> 
    total + parseFloat(exp.amount),0);
    setRemainingBalance((initialBalance-totalExpenses).toFixed(2));
  }, [expenses, initialBalance]);

  const handleAddOrUpdate = async(expense) => {
    if(expense.id){
      await axios.put(`http://localhost:5000/expenses/${expense.id}`,expense);
      setEditingExpense(null);
    } else{
      await axios.post('http://localhost:5000/expenses',expense);
    }
    fetchExpenses();
  };

  const handleEdit = (expense) => setEditingExpense(expense);

  const handleDelete = async(id) =>{
    await axios.delete(`http://localhost:5000/expenses/${id}`);
    fetchExpenses();
  };

  const handleBalanceChange = (e) => setInitialBalance(parseFloat(e.target.value) || 0);
  

  return (
    <div className='container'>
      <h2>Expense manager</h2>
      <div>
      <lable> Set Initial Balance:
      <input type='number' value={initialBalance} onChange={handleBalanceChange} step='0.01' />
      </lable>
      </div>

      <div>
        Total Expenses: ${expenses.reduce((total, exp) => total+parseFloat(exp.amount),0).toFixed(2)}<br/>
        Remaining Balance: ${remainingBalance}
      </div>

      <ExpenseForm expense={editingExpense} onSubmit={handleAddOrUpdate} />
      <ExpenseList expenses ={expenses} onEdit={handleEdit} onDelete={handleDelete} />
    </div>
  )
}

export default App;
