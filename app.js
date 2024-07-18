const express = require('express');
const path = require('path');
const router = require('./routes/routes'); // Import the routes module
const app = express();
const port = 3000;

// Configurar el motor de vistas EJS
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

// Configurar archivos estáticos
app.use(express.urlencoded({ extended: true }));

app.use(express.static(path.join(__dirname, 'public')));

// Ruta principal
app.use('/', router);


app.listen(port, () => {
  console.log(`Servidor Node.js escuchando en http://localhost:${port}`);
});