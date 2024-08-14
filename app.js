// app.js
const express = require('express');
const session = require('express-session');
const bodyParser = require('body-parser');
const path = require('path'); 

const app = express();
const port = 3000;

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(bodyParser.urlencoded({ extended: false }));
app.use(session({
  secret: 'secreto',
  resave: false,
  saveUninitialized: false,

}));

app.use(express.static(path.join(__dirname, 'public')));




const loginRoutes = require('./router/login');
const router = require('./router/routes');

app.use('/login', loginRoutes);
app.use('/proyecto', router);

app.get('/', (req, res) => {
  res.redirect('/login');
});

app.listen(port, () => {
  console.log(`Servidor Node.js escuchando en http://localhost:${port}`);
});
