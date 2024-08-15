const express = require('express');
const router = express.Router();
const multer = require('multer')

const path = require('path');
const loginController = require('../controllers/loginController');


const upload = multer({ dest: 'uploads/' });

router.get('/', loginController.showLogin);
router.post('/add', upload.single('file'), loginController.createUser);
router.post('/', loginController.loginUser);

// Ruta para logout
router.get('/logout', (req, res) => {
    req.session.destroy((err) => {
        if (err) {
            return res.redirect('/');
        }
        res.clearCookie('connect.sid');
        res.redirect('/login');
    });
});



////Seccion de usuarios
router.get('/usuarios', loginController.showUserProfile);
router.post('/usuarios/edit/:id', upload.single('file'), loginController.editUser)
router.get('/usuarios/delete/:id', loginController.deleteUser)

// router.get('/login2', (req, res) => {
//     res.render('login2', { title: 'Mi Proyecto Parcial 2', routes: router });
//   });

module.exports = router;
