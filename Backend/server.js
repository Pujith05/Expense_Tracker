const express = require('express');
const mysql = require('mysql2');
const cors = require('cors');

const app = express();
app.use(cors());
app.use(express.json());

const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'Radha@143',
    database: 'expense_db'
});

db.connect((err)=>{
    if (err) throw err;
    console.log("MYSQL Connected");
});

app.listen(5000,()=>{
    console.log('Server listening on port 5000');
});

app.get('/expenses', (req,res)=>{
    db.query('select * from expenses',
    (err,results)=>{
        if (err) throw err;
        res.json(results);
    });
});

app.post('/expenses', (req,res)=>{
    const {amount, category, description, expense_date} = req.body;
    db.query('insert into expenses (amount, category, description, expense_date) values (?,?,?,?)',
    [amount, category, description, expense_date],
    (err,result)=>{
        if (err) throw err;
        res.json({id: result.insertId, ...req.body});
    });
});

app.put('/expenses/:id', (req,res)=>{
    const {id} = req.params;
    const {amount, category, description, expense_date}=req.body;
    db.query('update expenses set amount=?, category=?, description=?, expense_date=? where id=?',
        [amount, category, description, expense_date, id],
        (err)=>{
            if(err) throw err;
            res.json({id, ...req.body});
        }        
    );
});

app.delete('/expenses/:id', (req,res)=>{
    const {id} = req.params;
    db.query('delete from expenses where id=?',
        [id],
        (err)=>{
            if(err) throw err;
            res.json({sucess:true});
        }
    );
});

