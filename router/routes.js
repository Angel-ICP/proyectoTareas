const express = require('express');
const router = express.Router();
const estadistica = require('../controllers/estadisticaController.js');

// Ruta para obtener todos los proveedores

router.get('/', (req, res) => {
    res.render('index', { title: 'Mi Proyecto Parcial 2', routes: router });
  });

/////////rutas de estadistica//////////////
// Ruta para obtener todos los proveedores
router.get('/estadistica', estadistica.getAllEstadistica);

// Ruta para añadir un nuevo proveedor
router.post('/estadistica/add', estadistica.addEstadistica);


// Ruta para editar un proveedor existente
router.post('/estadistica/edit/:id', estadistica.editEstadistica);

// Ruta para borrar un proveedor
router.get('/estadistica/delete/:id', estadistica.deleteEstadistica);
  



module.exports = router;
