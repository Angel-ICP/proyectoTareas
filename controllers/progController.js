const db = require('../db');

// Obtener todos los trabajos
exports.getAllProgramacion = (req, res) => {
    db.query('SELECT * FROM programacion', (err, results) => {
        if (err) {
            return res.status(500).json({ error: err.message });
        }
        res.render('programacion', { programacion: results });
    });
};

// Añadir un trabajo nuevo
exports.addProgramacion = (req, res) => {
    const { nombre, fecha, fecha_termina, estado, parcial, calificacion, valor_cal } = req.body;
    const newTrabajo = { nombre, fecha, fecha_termina, estado, parcial, calificacion, valor_cal };
    db.query('INSERT INTO programacion SET ?', newTrabajo, (err, results) => {
        if (err) {
            return res.status(500).json({ error: err.message });
        }
        res.redirect('/programacion');
    });
};

// Editar un trabajo
exports.editProgramacion = (req, res) => {
    const { id } = req.params;
    const { nombre, fecha, fecha_termina, estado, parcial, calificacion, valor_cal  } = req.body;
    const updatedTrabajo = {nombre, fecha, fecha_termina, estado, parcial, calificacion, valor_cal };
    db.query('UPDATE programacion SET ? WHERE id = ?', [updatedTrabajo, id], (err, results) => {
        if (err) {
            return res.status(500).json({ error: err.message });
        }
        res.redirect('/programacion');
    });
};

// Borrar un trabajo
exports.deleteProgramacion = (req, res) => {
    const { id } = req.params;
    db.query('DELETE FROM programacion WHERE id = ?', [id], (err, results) => {
        if (err) {
            return res.status(500).json({ error: err.message });
        }
        res.redirect('/programacion');
    });
};
