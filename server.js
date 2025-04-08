"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
// Importações
var dotenv = require("dotenv");
dotenv.config();
var mongodbUri = process.env.MONGODB_URI;
var bcrypt = require('bcryptjs');
var express = require('express'); // call express
var app = express(); // define our app using express
var bodyParser = require('body-parser');
var UserRoutes = require('./routes/UserRoutes');
// ROUTES FOR OUR API
// =============================================================================
var router = express.Router();
var app = express(); // Definir a app através do express
// Configurações para o uso do bodyParser()
// Permite a extraçao dos dados obtidos com o método POST
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
var port = process.env.PORT || 8080; // Definir a porta
var mongoose = require('mongoose'); // Conexão com a base de dados (MongoDB)
mongoose.connect(mongodbUri);
// Registar as rotas (defininas no ficheiro UserRoutes)
var UserRoutes = require('./routes/UserRoutes');
app.use('/med', UserRoutes);
// Iniciar o servidor
app.listen(port);
console.log('Aplicação iniciada na porta ' + port);
