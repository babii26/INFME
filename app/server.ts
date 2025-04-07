// Importações
import express = require("express");
import bodyParser = require("body-parser");

var app = express(); // Definir a app através do express

// Configurações para o uso do bodyParser()
// Permite a extraçao dos dados obtidos com o método POST
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

var port = process.env.PORT || 8080; // Definir a porta

var mongoose   = require('mongoose'); // Conexão com a base de dados (MongoDB)
mongoose.connect('mongodb+srv://juliobsouza:B4yPxWoP1X0FysAB@infme.epzihtd.mongodb.net/?retryWrites=true&w=majority&appName=infme'); 

// Registar as rotas (defininas no ficheiro UserRoutes)
var UserRoutes = require('./routes/UserRoutes');
app.use('/med', UserRoutes);

// Iniciar o servidor
app.listen(port);
console.log('Aplicação iniciada na porta ' + port);









