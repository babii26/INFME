// Importações
import * as dotenv from 'dotenv';

dotenv.config();

const mongodbUri = process.env.MONGODB_URI;
const bcrypt = require('bcryptjs');

console.log("Projeto init");

var express    = require('express');        // call express
var app        = express();                 // define our app using express
var bodyParser = require('body-parser');
var UserRoutes = require('./routes/UserRoutes');
var formularioRoutes = require('./routes/UserRoutes');
var AlertaRoutes = require('./routes/AlertaRoutes');

// ROUTES FOR OUR API
// =============================================================================
var router = express.Router();   
//var app = express(); // Definir a app através do express

// Configurações para o uso do bodyParser()
// Permite a extraçao dos dados obtidos com o método POST
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

var port = process.env.PORT || 8080; // Definir a porta

var mongoose   = require('mongoose'); // Conexão com a base de dados (MongoDB)
mongoose.connect(mongodbUri); 

console.log("este e o projeto");

// Registar as rotas (defininas no ficheiro UserRoutes)
var UserRoutes = require('./routes/UserRoutes');
app.use('/med', UserRoutes);

// Definição das rotas
//app.use('/med', UserRoutes);
app.use('/formulario', formularioRoutes);
app.use('/alertas', AlertaRoutes);



// Iniciar o servidor
app.listen(port);
console.log('Aplicação iniciada na porta ' + port);









