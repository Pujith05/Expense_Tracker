import { useEffect, useState } from "react";

function ExpenseForm({expense, onSubmit}) {
    const [form, setForm] = useState({

        amount:'',
        category:'',
        description:'',
        expense_date:''
    });

    useEffect(()=>{
        if(expense) setForm(expense);
        else setForm({
            amount:'',
            category:'',
            description:'',
            expense_date:''
        });
    }, [expense]);

    const handleChange = (e)=>{
        const {name,value} = e.target;
        setForm({...form,[name]:value});
    };

    const handleSubmit = (e)=>{
        e.preventDefault();
        onSubmit(form);
        setForm({amount:'',
            category:'',
            description:'',
            expense_date:''
        });
    };

    return(
        <form onSubmit={handleSubmit}>
            <input name="amount" placeholder="Amount" type="number" value={form.amount} onChange={handleChange} required /><br></br>
            <input name="category" placeholder="Category" value={form.category} onChange={handleChange} required /><br></br>
            <input name="description" placeholder="Description" value={form.description} onChange={handleChange} /><br></br>
            <input name="expense_date" type="date" value={form.expense_date} onChange={handleChange} required /><br></br>
            <button type="submit">{expense ? 'Update' : 'Add'} Expense</button>
        </form>
    );

}

export default ExpenseForm;