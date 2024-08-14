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
  // Obtén el usuario de la sesión
  const user = req.session.user;

  if (!user) {
    return res.redirect('/login'); // Redirige al login si el usuario no está autenticado
  }
  if (user.files) {
    user.files = `data:image/jpg;base64,${user.files.toString('base64')}`;
  }

  // Renderiza la vista del perfil de usuario
  res.render('usuarios', { usuario: user });
};



const storage = multer.memoryStorage(); // Usamos memoria para almacenar archivos en buffer
const upload = multer({ storage: storage });

exports.createUser = (req, res) => {
  // El middleware `upload.single('file')` se encarga de manejar el archivo subido
  upload.single('file')(req, res, (err) => {
    if (err) {
      return res.status(500).json({ message: 'Error al subir el archivo' });
    }

    const { name, middleName, lastName, carrera, email, phone, username, password } = req.body;
    const file = req.file ? req.file.buffer : null; // Usamos el buffer del archivo

    if (!username || !password) {
      res.render('login', { message: 'Username y password son requeridos' });
      return;
    }

    bcrypt.hash(password, 10, (err, hashedPassword) => {
      if (err) throw err;

      const newUser = { name, middleName, lastName, carrera, email, phone, username, password: hashedPassword, files: file };
      
      db.query('INSERT INTO usuarios SET ?', newUser, (err, results) => {
        if (err) throw err;
        res.redirect('/login');
      });
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

