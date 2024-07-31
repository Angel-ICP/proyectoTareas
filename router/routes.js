const express = require('express');
const router = express.Router();
const estadistica = require('../controllers/estadisticaController.js');
const calculo = require('../controllers/calculoController.js');
const programacion = require('../controllers/progController.js');

// Ruta para obtener todos los proveedores


function isAuthenticated(req, res, next) {
  if (req.session.user) {
  return next();
  } else {
  res.redirect('/login');
  }
 }
//  router.get('/', isAuthenticated, productController.getProducts);
 


// Ruta Principal
router.get('/', isAuthenticated, (req, res) => {
    res.render('index', { title: 'Mi Proyecto Parcial 2', routes: router });
  });


/////////rutas de estadistica//////////////
// Ruta para obtener todos los trabajos
router.get('/estadistica', isAuthenticated, estadistica.getAllEstadistica);
// Ruta para añadir un nuevo trabajo
router.post('/estadistica/add', isAuthenticated, estadistica.addEstadistica);
// Ruta para editar un trabajo existente
router.post('/estadistica/edit/:id', isAuthenticated, estadistica.editEstadistica);
// Ruta para borrar un trabajo
router.get('/estadistica/delete/:id', isAuthenticated, estadistica.deleteEstadistica);
  


/////////rutas de calculo//////////////
// Ruta para obtener todos los trabajos
router.get('/calculo', isAuthenticated, calculo.getAllCalculo);
// Ruta para añadir un nuevo trabajo
router.post('/calculo/add', isAuthenticated, calculo.addCalculo);
// Ruta para editar un trabajo existente
router.post('/calculo/edit/:id', isAuthenticated, calculo.editCalculo);
// Ruta para borrar un trabajo
router.get('/calculo/delete/:id', isAuthenticated, calculo.deleteCalculo);

  



/////////rutas de calculo//////////////
// Ruta para obtener todos los trabajos
router.get('/programacion', isAuthenticated, programacion.getAllProgramacion);
// Ruta para añadir un nuevo trabajo
router.post('/programacion/add', isAuthenticated, programacion.addProgramacion);
// Ruta para editar un trabajo existente
router.post('/programacion/edit/:id', isAuthenticated, programacion.editProgramacion);
// Ruta para borrar un trabajo
router.get('/programacion/delete/:id', isAuthenticated, programacion.deleteProgramacion);


// Ruta para cerrar sesión
router.get('/logout', (req, res) => {
  req.session.destroy((err) => {
    if (err) throw err;
    res.redirect('/login');
  });
});

module.exports = router;
