const db = require('../db');

// Obtener todos los trabajos
exports.getAllCalculo = (req, res) => {
    db.query('SELECT * FROM calculo', (err, results) => {
        if (err) {
            return res.status(500).json({ error: err.message });
        }
        res.render('calculo', { calculo: results });
    });
};

// Añadir un trabajo nuevo
exports.addCalculo = (req, res) => {
    const { nombre, fecha, fecha_termina, estado, parcial, calificacion, valor_cal } = req.body;
    const newTrabajo = { nombre, fecha, fecha_termina, estado, parcial, calificacion, valor_cal };
    db.query('INSERT INTO calculo SET ?', newTrabajo, (err, results) => {
        if (err) {
            return res.status(500).json({ error: err.message });
        }
        res.redirect('/index/calculo');
    });
};

// Editar un trabajo
exports.editCalculo = (req, res) => {
    const { id } = req.params;
    const { nombre, fecha, fecha_termina, estado, parcial, calificacion, valor_cal  } = req.body;
    const updatedTrabajo = {nombre, fecha, fecha_termina, estado, parcial, calificacion, valor_cal };
    db.query('UPDATE calculo SET ? WHERE id = ?', [updatedTrabajo, id], (err, results) => {
        if (err) {
            return res.status(500).json({ error: err.message });
        }
        res.redirect('/index/calculo');
    });
};

// Borrar un trabajo
exports.deleteCalculo = (req, res) => {
    const { id } = req.params;
    db.query('DELETE FROM calculo WHERE id = ?', [id], (err, results) => {
        if (err) {
            return res.status(500).json({ error: err.message });
        }
        res.redirect('/index/calculo');
    });
};
