const db = require('../db');

// Obtener todos los trabajos
exports.getAllTareas = (req, res) => {
    db.query('SELECT * FROM tareas', (err, results) => {
        if (err) {
            return res.status(500).json({ error: err.message });
        }
        res.render('tareas', { tareas: results });
    });
};

// Añadir un trabajo nuevo
exports.addTareas = (req, res) => {
    const { materia, nombre, fecha, fecha_termina, estado, parcial, calificacion, valor_cal } = req.body;
    const newTrabajo = { materia, nombre, fecha, fecha_termina, estado, parcial, calificacion, valor_cal };
    db.query('INSERT INTO tareas SET ?', newTrabajo, (err, results) => {
        if (err) {
            return res.status(500).json({ error: err.message });
        }
        res.redirect('/proyecto/tareas');
    });
};

// Editar un trabajo
exports.editTareas = (req, res) => {
    const { id } = req.params;
    const { materia, nombre, fecha, fecha_termina, estado, parcial, calificacion, valor_cal  } = req.body;
    const updatedTrabajo = {materia, nombre, fecha, fecha_termina, estado, parcial, calificacion, valor_cal };
    db.query('UPDATE tareas SET ? WHERE id = ?', [updatedTrabajo, id], (err, results) => {
        if (err) {
            return res.status(500).json({ error: err.message });
        }
        res.redirect('/proyecto/tareas');
    });
};

// Borrar un trabajo
exports.deleteTareas = (req, res) => {
    const { id } = req.params;
    db.query('DELETE FROM tareas WHERE id = ?', [id], (err, results) => {
        if (err) {
            return res.status(500).json({ error: err.message });
        }
        res.redirect('/proyecto/tareas');
    });
};


exports.getLastRegistros = (req, res) => {
    db.query('SELECT * FROM tareas WHERE estado = "pendiente" ORDER BY fecha_termina ASC LIMIT 5', (err, results) => {
        if (err) {
            return res.status(500).json({ error: err.message });
        }
        res.render('index', { registros: results }); 
    });
};
