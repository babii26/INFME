"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
// Importações
const dotenv = __importStar(require("dotenv"));
dotenv.config();
const mongodbUri = process.env.MONGODB_URI;
const bcrypt = require('bcryptjs');
console.log("Projeto init");
var express = require('express'); // call express
var app = express(); // define our app using express
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
var mongoose = require('mongoose'); // Conexão com a base de dados (MongoDB)
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
