const db = require('../db');
const bcrypt = require('bcryptjs');
const multer = require('multer');


exports.showLogin = (req, res) => {
  res.render('login');
};

exports.loginUser = (req, res) => {
  const { username, password } = req.body;
  db.query('SELECT * FROM usuarios WHERE username = ? OR email = ?', [username, username], (err, results) => {
    if (err) throw err;
    if (results.length > 0) {
      const user = results[0];
      bcrypt.compare(password, user.password, (err, match) => {
        if (err) throw err;
        if (match) {
          req.session.user = user;
          res.redirect('/proyecto');
          console.log('Usuario:', user); // Verifica el contenido del objeto usu
        } else {
          res.render('login', { message: 'Usuario o contraseña incorrectos' });
        }
      });
    } else {
      res.render('login', { message: 'Usuario o contraseña incorrectos' });
    }
  });

};


exports.showUserProfile = (req, res) => {
  const user = req.session.user;

  if (!user) {
    return res.redirect('/login');
  }
  if (Buffer.isBuffer(user.files)) {
    user.files = user.files.toString('utf8');
  }


  res.render('usuarios', { usuario: user });
};






exports.createUser = (req, res) => {
  const { name, middleName, lastName, carrera, email, phone, username, password } = req.body;
  const files = req.file ? req.file.filename : null; // Guarda el nombre del archivo como cadena

  if (!username || !password) {
    res.render('login', { message: 'Username y password son requeridos' });
    return;
  }

  bcrypt.hash(password, 10, (err, hashedPassword) => {
    if (err) throw err;

    const newUser = { name, middleName, lastName, carrera, email, phone, username, password: hashedPassword, files };
    
    db.query('INSERT INTO usuarios SET ?', newUser, (err, results) => {
      if (err) throw err;
      res.redirect('/login');
    });
  });
};


// exports.createUser = (req, res) => {
//   const {  name, middleName, lastName, carrera, email, phone, username, password, file } = req.body;
//   console.log('username:', username); 
//   console.log('password:', password); 

//   if (!username || !password) {
//     res.render('login', { message: 'Username y password son requeridos' });
//     return;
//   }

//   bcrypt.hash(password, 10, (err, hashedPassword) => {
//     const newUser = { name, middleName, lastName, carrera, email, phone, username, password: hashedPassword, file }
//     if (err) throw err;
//     db.query('INSERT INTO usuarios SET ?', newUser, (err, results) => {
//       if (err) throw err;
//       res.redirect('/login');
//     });
//   });
// };

