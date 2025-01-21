const express = require('express');
const mysql = require('mysql2');

const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();
app.use(cors());
app.use(bodyParser.json());

/*
const db = mysql.createConnection({
    host: 'sql10.freemysqlhosting.net',
    user: 'sql10725374',
    password: 'zsqY4CNIVA',
    database: 'sql10725374'
});
*/
const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'password',
    database: 'ivo_curriculum'

});

db.connect(err => {
    if (err) {
        console.error('Error connecting to MySQL:', err);
        return;
    }
    console.log('Connected to MySQL');
});

app.post('/addNota', (req, res) => {
    const { descripcion } = req.body;
    if (!descripcion) {
        return res.status(400).json({ error: 'descripcion is required' });
    }
    const query = 'INSERT INTO notes (descripcion) VALUES (?)';
    db.query(query, [descripcion], (err, result) => {
        if (err) {
            console.error('Error inserting note:', err);
            return res.status(500).json({ error: 'Database error' });
        }
        res.status(200).json({ id: result.insertId, descripcion });
    });
});
app.get('/notas', (req, res) => {
    const query = 'SELECT * FROM notes';
    db.query(query, (err, results) => {
        if (err) {
            console.error('Error fetching notes:', err);
            return res.status(500).json({ error: 'Database error' });
        }
        res.status(200).json(results);
    });
});
app.post('/updateColor', (req, res) => {
    console.log(req.body); // Agrega esta línea para ver qué datos llegan al backend
    const { color, id } = req.body; // Asegúrate de recibir el ID y la descripción desde el frontend

    if (!color || !id ) {
        return res.status(400).json({ error: 'Color, id are required' });
    }

    const query = 'UPDATE notes SET color = ? WHERE id = ?';
    db.query(query, [color, id], (err, result) => {
        if (err) {
            console.error('Error updating color:', err);
            return res.status(500).json({ error: 'Database error' });
        }
        res.status(200).json({ message: 'Color updated successfully', id });
    });
});


app.listen(3001, () => {
    console.log('Server running on port 3001');
});
