const express = require('express');
const mysql = require('mysql');
const bodyParser = require('body-parser');

const app = express();
const port = 3000;

// Middleware
app.use(bodyParser.json());

// MySQL Connection
const db = mysql.createConnection({
    host: 'LAPTOP-9SCINE3P ',       // or IP of MySQL server
    user: 'saransoul',
    password: 'saransoul4',
    database: 'userdb'
});

db.connect((err) => {
    if (err) throw err;
    console.log('Connected to MySQL database');
});

// API Endpoint to insert user
app.post('/api/users', (req, res) => {
    const { name, email, password } = req.body;

    if (!name || !email || !password) {
        return res.status(400).send('All fields are required');
    }

    const query = 'INSERT INTO users (name, email, password) VALUES (?, ?, ?)';
    db.query(query, [name, email, password], (err, result) => {
        if (err) {
            console.error('Insert error:', err);
            return res.status(500).send('Database error');
        }
        res.status(201).send({ message: 'User added successfully', id: result.insertId });
    });
});

app.listen(port, () => {
    console.log(`Server running on http://localhost:${port}`);
});
