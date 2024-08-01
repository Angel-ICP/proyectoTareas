const db = require('../db');
const bcrypt = require('bcryptjs');

exports.showLogin = (req, res) => {
  res.render('login');
};

exports.loginUser = (req, res) => {
  const { username, password } = req.body;
  db.query('SELECT * FROM usuarios WHERE username = ?', [username], (err, results) => {
    if (err) throw err;
    if (results.length > 0) {
      const user = results[0];
      bcrypt.compare(password, user.password, (err, match) => {
        if (err) throw err;
        if (match) {
          req.session.user = user;
          res.redirect('/proyecto');
        } else {
          res.render('login', { message: 'Usuario o contraseña incorrectos' });
        }
      });
    } else {
      res.render('login', { message: 'Usuario o contraseña incorrectos' });
    }
  });
};

exports.createUser = (req, res) => {
  const { username, password } = req.body;
  console.log('username:', username);  // Agrega esto
  console.log('password:', password);  // Agrega esto

  if (!username || !password) {
    res.render('login', { message: 'Username y password son requeridos' });
    return;
  }

  bcrypt.hash(password, 10, (err, hashedPassword) => {
    if (err) throw err;
    db.query('INSERT INTO usuarios SET ?', { username, password: hashedPassword }, (err, results) => {
      if (err) throw err;
      res.redirect('/login');
    });
  });
};