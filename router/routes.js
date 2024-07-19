const express = require('express');
const router = express.Router();
const estadistica = require('../controllers/estadisticaController.js');
const calculo = require('../controllers/calculoController.js');
const programacion = require('../controllers/progController.js');

// Ruta para obtener todos los proveedores

router.get('/', (req, res) => {
    res.render('index', { title: 'Mi Proyecto Parcial 2', routes: router });
  });

/////////rutas de estadistica//////////////
// Ruta para obtener todos los trabajos
router.get('/estadistica', estadistica.getAllEstadistica);

// Ruta para añadir un nuevo trabajo
router.post('/estadistica/add', estadistica.addEstadistica);


// Ruta para editar un trabajo existente
router.post('/estadistica/edit/:id', estadistica.editEstadistica);

// Ruta para borrar un trabajo
router.get('/estadistica/delete/:id', estadistica.deleteEstadistica);
  


/////////rutas de calculo//////////////
// Ruta para obtener todos los trabajos
router.get('/calculo', calculo.getAllCalculo);

// Ruta para añadir un nuevo trabajo
router.post('/calculo/add', calculo.addCalculo);


// Ruta para editar un trabajo existente
router.post('/calculo/edit/:id', calculo.editCalculo);

// Ruta para borrar un trabajo
router.get('/calculo/delete/:id', calculo.deleteCalculo);
  




/////////rutas de calculo//////////////
// Ruta para obtener todos los trabajos
router.get('/programacion', programacion.getAllProgramacion);

// Ruta para añadir un nuevo trabajo
router.post('/programacion/add', programacion.addProgramacion);


// Ruta para editar un trabajo existente
router.post('/programacion/edit/:id', programacion.editProgramacion);

// Ruta para borrar un trabajo
router.get('/programacion/delete/:id', programacion.deleteProgramacion);
  



module.exports = router;
