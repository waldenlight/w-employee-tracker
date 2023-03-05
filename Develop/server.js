const express = require("express");
const mysql = require("mysql2");

const PORT = process.env.PORT || 3001;
const app = express();

// Express middleware
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

// Connect to database
const db = mysql.createConnection(
    {
        host: "localhost",
        user: "root",
        password: "FireFocusSitez100!",
        database: "employees_db",
    }
);

// Read all movies
app.get("/employees", (req, res) => {
    const sql = `SELECT id, first_name, last_name, title, department, salary, manager FROM employees`;

    db.query(sql, (err, rows) => {
        if (err) {
            res.status(500).json({ error: err.message });
            return;
        }
        res.json({
            data: rows
        });
    });
});

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
