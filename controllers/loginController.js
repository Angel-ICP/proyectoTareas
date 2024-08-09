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



// Configura multer para manejar la carga de archivos
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'public/img/');
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + path.extname(file.originalname));
  }
});
const upload = multer({ storage: storage });

exports.createUser = (req, res) => {
  upload.single('photo')(req, res, (err) => {
    if (err) {
      return res.status(500).json({ error: 'Error al cargar la imagen' });
    }

    const { name, middleName, lastName, carrera, email, phone, username, password } = req.body;
    const photo = req.file ? req.file.filename : null; // Si hay un archivo cargado, usa su nombre de archivo

    bcrypt.hash(password, 10, (err, hashedPassword) => {
      if (err) {
        return res.status(500).json({ error: 'Error al encriptar la contraseña' });
      }

      const newUser = { name, middleName, lastName, carrera, email, phone, username, password: hashedPassword, photo };

      db.query('INSERT INTO usuarios SET ?', newUser, (err, results) => {
        if (err) {
          return res.status(500).json({ error: err.message });
        }
        res.redirect('/login');
      });
    });
  });
};
// exports.createUser = (req, res) => {
//   const { username, password } = req.body;
//   console.log('username:', username); 
//   console.log('password:', password); 

//   if (!username || !password) {
//     res.render('login', { message: 'Username y password son requeridos' });
//     return;
//   }

//   bcrypt.hash(password, 10, (err, hashedPassword) => {
//     if (err) throw err;
//     db.query('INSERT INTO usuarios SET ?', { username, password: hashedPassword }, (err, results) => {
//       if (err) throw err;
//       res.redirect('/login');
//     });
//   });
// };