const db = require('../db');

// Obtener todos los trabajos
exports.getAllEstadistica = (req, res) => {
    db.query('SELECT * FROM estadistica', (err, results) => {
        
        if (err) {
            return res.status(500).json({ error: err.message });
        }
        res.render('estadistica', { esta: results });
    });
};

// Añadir un trabajo nuevo
exports.addEstadistica = (req, res) => {
    const { nombre, fecha, estado, calificacion } = req.body;
    const newTrabajo = { nombre, fecha, estado, calificacion };
    db.query('INSERT INTO estadistica SET ?', newTrabajo, (err, results) => {
        if (err) {
            return res.status(500).json({ error: err.message });
        }
        res.redirect('/estadistica');
    });
};

// Editar un trabajo
exports.editEstadistica = (req, res) => {
    const { id } = req.params;
    const { nombre, fecha, estado, calificacion } = req.body;
    const updatedTrabajo = { nombre, fecha, estado, calificacion };
    db.query('UPDATE estadistica SET ? WHERE id = ?', [updatedTrabajo, id], (err, results) => {
        if (err) {
            return res.status(500).json({ error: err.message });
        }
        res.redirect('/estadistica');
    });
};

// Borrar un trabajo
exports.deleteEstadistica = (req, res) => {
    const { id } = req.params;
    db.query('DELETE FROM estadistica WHERE id = ?', [id], (err, results) => {
        if (err) {
            return res.status(500).json({ error: err.message });
        }
        res.redirect('/estadistica');
    });
};
