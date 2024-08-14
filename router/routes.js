const express = require('express');
const router = express.Router();
const tareas = require('../controllers/tareasController.js');

// Ruta para obtener todos los trabajos //Middleware para proteger las rutas //
function isAuthenticated(req, res, next) {
  if (req.session.user) {
  return next();
  } else {
  res.redirect('/login');
  }
 }
 

// Ruta Principal
// router.get('/', isAuthenticated, (req, res) => {
//     res.render('index', { title: 'Mi Proyecto Parcial 2', routes: router });
//   });

router.get('/', isAuthenticated, tareas.getLastRegistros);

// router.get('/', isAuthenticated, tareas.getCalculo, tareas.getEstadistica, tareas.getProgramacion);





/////////rutas de tareas//////////////
// Ruta para obtener todos los trabajos
router.get('/tareas', isAuthenticated, tareas.getAllTareas);
// Ruta para añadir un nuevo trabajo
router.post('/tareas/add', isAuthenticated, tareas.addTareas);
// Ruta para editar un trabajo existente
router.post('/tareas/edit/:id', isAuthenticated, tareas.editTareas);
// Ruta para borrar un trabajo
router.get('/tareas/delete/:id', isAuthenticated, tareas.deleteTareas);
  

  

module.exports = router;
