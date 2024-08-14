const express = require('express');
const router = express.Router();
const loginController = require('../controllers/loginController');

router.get('/', loginController.showLogin);
router.post('/add', loginController.createUser);
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


router.get('/usuarios', loginController.showUserProfile);


// router.get('/login2', (req, res) => {
//     res.render('login2', { title: 'Mi Proyecto Parcial 2', routes: router });
//   });

module.exports = router;
