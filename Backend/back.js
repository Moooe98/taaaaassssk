import express from 'express';
import mysql from 'mysql';
import cors from 'cors';

const app = express();
app.use(cors());
app.use(express.json());

const db = mysql.createConnection({
    host: 'localhost',
    port: 3306,  
    user: 'root',
    password: 'Mohamed__357789Essam',
    database: 'crud',
});

db.connect((err) => {
    if (err) {
        console.error('Error connecting to the database:', err);
        return;
    }
    console.log('Connected to the database');
});

app.get('/', (req, res) => {
    const sql = "SELECT * FROM student";
    db.query(sql, (err, result) => {
        if (err) {
            console.error('Error executing query:', err);
            return res.status(500).json({ Message: "Error inside server" });
        }
        return res.json(result);
    });
});

app.post('/student', (req, res) => {
    const sql = "INSERT INTO student (`Name`,`Email`) VALUES (?)";
    const values = [
      req.body.name,
      req.body.email
    ];
    db.query(sql, [values], (err, result) => {
      if (err) return res.json(err);
      return res.json(result);
    });
  });


app.get('/read/:id', (req, res) => {
    const sql = "SELECT * FROM student WHERE ID = ?";
    const id = req.params.id;
    db.query(sql, [id],(err, result) => {
        if (err) {
            console.error('Error executing query:', err);
            return res.status(500).json({ Message: "Error inside server" });
        }
        return res.json(result);
    });
});


app.put('/update/:id', (req, res) => {
    const sql = "UPDATE student SET `Name`=?, `Email`=? WHERE ID=?";
    const id = req.params.id;
    db.query(sql, [req.body.name, req.body.email, id], (err, result) => {
      if(err) return res.json({Message: "Error inside server"});
      return res.json(result);
    });
  });

app.delete('/delete/:id', (req, res) => {
    console.log(`Received delete request for ID: ${req.params.id}`);
    const sql = "DELETE FROM student WHERE ID = ?";
    const id = req.params.id;

    db.query(sql, [id], (err, result) => {
        if (err) {
            console.error(err); // Log error for server-side debugging
            return res.status(500).json({ Message: "Error inside server" });
        }

        if (result.affectedRows === 0) {
            return res.status(404).json({ Message: "Student not found" });
        }

        return res.status(204).send(); // No content to send back
    });
});

  

const PORT = process.env.PORT || 8081;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});

process.on('SIGINT', () => {
    db.end((err) => {
        if (err) {
            console.error('Error closing database connection:', err);
        }
        console.log('Database connection closed');
        process.exit(0);
    });
});