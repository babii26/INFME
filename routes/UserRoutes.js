var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g = Object.create((typeof Iterator === "function" ? Iterator : Object).prototype);
    return g.next = verb(0), g["throw"] = verb(1), g["return"] = verb(2), typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var express = require('express');
var mongoose = require('mongoose');
var jwt = require('jsonwebtoken');
var bcrypt = require('bcryptjs');
var bodyParser = require("body-parser");
var userModel = require("../models/user");
var patientModel = require("../models/paciente");
var physicianModel = require("../models/medico");
var VerifyToken = require("../auth/VerifyToken");
var userRoutes = require('./routes/UserRoutes');
var router = express.Router();
var jwt = jwt;
// rota para testar - GET http://localhost:8080/med)
router.get('/', function (req, res) {
    res.json({ message: 'Bem vindo ao Med-Checker!!' });
});
// Rota para registar um utilizador - POST http://localhost:8080/med/Register/User
router.post('/Register/User', function (req, res) {
    return __awaiter(this, void 0, void 0, function () {
        var _a, name_1, email, password, isAdmin, newUser, err_1;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    _b.trys.push([0, 2, , 3]);
                    _a = req.body, name_1 = _a.name, email = _a.email, password = _a.password, isAdmin = _a.isAdmin;
                    newUser = new userModel({
                        name: name_1,
                        email: email,
                        password: password,
                        isAdmin: isAdmin
                    });
                    // Gravar o utilizador na base de dados
                    return [4 /*yield*/, newUser.save()];
                case 1:
                    // Gravar o utilizador na base de dados
                    _b.sent();
                    res.status(201).json({ message: 'Utilizador registado com sucesso!', utilizador: newUser });
                    return [3 /*break*/, 3];
                case 2:
                    err_1 = _b.sent();
                    res.status(500).json({ error: 'Erro do servidor' });
                    return [3 /*break*/, 3];
                case 3: return [2 /*return*/];
            }
        });
    });
});
// Rota para registar um médico - POST http://localhost:8080/med/Register/Physician
router.post('/Register/Physician', function (req, res) {
    return __awaiter(this, void 0, void 0, function () {
        var _a, specialty, user, newPhisycian, err_2;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    _b.trys.push([0, 2, , 3]);
                    _a = req.body, specialty = _a.specialty, user = _a.user;
                    newPhisycian = new physicianModel({
                        specialty: specialty,
                        user: user
                    });
                    // Gravar o novo médico na base de dados
                    return [4 /*yield*/, newPhisycian.save()];
                case 1:
                    // Gravar o novo médico na base de dados
                    _b.sent();
                    res.status(201).json({ message: 'Médico registado com sucesso!', physician: newPhisycian });
                    return [3 /*break*/, 3];
                case 2:
                    err_2 = _b.sent();
                    res.status(500).json({ error: 'Erro do servidor' });
                    return [3 /*break*/, 3];
                case 3: return [2 /*return*/];
            }
        });
    });
});
// Rota para registar um paciente - POST http://localhost:8080/med/Register/Patient
router.post('/Register/Patient', function (req, res) {
    return __awaiter(this, void 0, void 0, function () {
        var _a, physician, user, newPatient, err_3;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    _b.trys.push([0, 2, , 3]);
                    _a = req.body, physician = _a.physician, user = _a.user;
                    newPatient = new patientModel({
                        physician: physician,
                        user: user
                    });
                    // Gravar o novo paciente na base de dados
                    return [4 /*yield*/, newPatient.save()];
                case 1:
                    // Gravar o novo paciente na base de dados
                    _b.sent();
                    res.status(201).json({ message: 'Paciente registado com sucesso!', patient: newPatient });
                    return [3 /*break*/, 3];
                case 2:
                    err_3 = _b.sent();
                    res.status(500).json({ error: 'Erro do servidor' });
                    return [3 /*break*/, 3];
                case 3: return [2 /*return*/];
            }
        });
    });
});
// Rota para realizar o login (todos os utilizadores) - POST http://localhost:8080/med/login
router.post('/login', function (req, res) {
    return __awaiter(this, void 0, void 0, function () {
        var user, payload, theToken, err_4;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    _a.trys.push([0, 2, , 3]);
                    return [4 /*yield*/, userModel.findOne({ email: req.body.email, password: req.body.password }).exec()];
                case 1:
                    user = _a.sent();
                    if (!user) {
                        return [2 /*return*/, res.status(401).json({ success: false, message: 'utilizador não encontrado!' })];
                    }
                    payload = { user: user.email };
                    theToken = jwt.sign(payload, 'InfMed_20232024', { expiresIn: 86400 });
                    res.json({ success: true, message: 'Token gerado!', token: theToken });
                    return [3 /*break*/, 3];
                case 2:
                    err_4 = _a.sent();
                    console.error('Erro ao realizar login:', err_4);
                    res.status(500).json({ success: false, message: 'Erro do servidor.' });
                    return [3 /*break*/, 3];
                case 3: return [2 /*return*/];
            }
        });
    });
});
// Rota para o médico visualizar a informação dos seus pacientes - GET http://localhost:8080/med/ListPatients/:physician_id
router.get('/ListPatients/:physician_id', VerifyToken, function (req, res) {
    return __awaiter(this, void 0, void 0, function () {
        var physicianId, physician, patients, error_1;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    physicianId = req.params.physician_id;
                    _a.label = 1;
                case 1:
                    _a.trys.push([1, 4, , 5]);
                    return [4 /*yield*/, physicianModel.findById(physicianId)];
                case 2:
                    physician = _a.sent();
                    if (!physician) {
                        return [2 /*return*/, res.status(404).json({ message: 'Médico não encontrado ou id não corresponde a um médico' })];
                    }
                    return [4 /*yield*/, patientModel.find({ physician: physicianId }).exec()];
                case 3:
                    patients = _a.sent();
                    res.json(patients);
                    return [3 /*break*/, 5];
                case 4:
                    error_1 = _a.sent();
                    console.error('Erro ao buscar pacientes do médico:', error_1);
                    res.status(500).json({ message: 'Erro do servidor.' });
                    return [3 /*break*/, 5];
                case 5: return [2 /*return*/];
            }
        });
    });
});
// Rota para responder ao questionário - PUT http://localhost:8080/med/patients/questionnaire/:patient_id
router.put('/patients/questionnaire/:patient_id', VerifyToken, function (req, res) {
    return __awaiter(this, void 0, void 0, function () {
        var patient, patientId, response, error_2;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    _a.trys.push([0, 4, , 5]);
                    return [4 /*yield*/, patientModel.findById(req.params.patient_id).exec()];
                case 1:
                    patient = _a.sent();
                    if (!patient) {
                        return [2 /*return*/, res.status(401).json({ success: false, message: 'Paciente não encontrado ou utilizador não é o paciente em questão!' })];
                    }
                    patient.formAnswers = req.body.formAnswers; // atualizar o paciente com as respostas do questionário
                    // Gravar as alterações na base de dados
                    return [4 /*yield*/, patient.save()];
                case 2:
                    // Gravar as alterações na base de dados
                    _a.sent();
                    patientId = patient._id;
                    return [4 /*yield*/, fetch('http://localhost:8080/med/send/alerts', {
                            method: 'POST',
                            headers: {
                                'Content-Type': 'application/json'
                            },
                            body: JSON.stringify({ patientId: patientId, })
                        })];
                case 3:
                    response = _a.sent();
                    // Verificar se a requisição  à rota anterior foi bem-sucedida
                    if (!response.ok) {
                        throw new Error('Erro ao enviar alertas.');
                    }
                    // Se a requisição foi bem-sucedida, enviar uma resposta ao paciente
                    res.json({ message: 'Respostas do questionário processadas.' });
                    return [3 /*break*/, 5];
                case 4:
                    error_2 = _a.sent();
                    console.error('Erro ao processar as respostas do questionário:', error_2);
                    res.status(500).json({ message: 'Erro do servidor.' });
                    return [3 /*break*/, 5];
                case 5: return [2 /*return*/];
            }
        });
    });
});
// Rota para enviar os alertas para o médico e para os pacientes - POST http://localhost:8080/med/send/alerts
router.post('/send/alerts', function (req, res) {
    return __awaiter(this, void 0, void 0, function () {
        var _a, patientId, messages, patient, physician, novoAlertaPaciente, novoAlertaPaciente, novoAlertaMedico, novoAlertaMedico, error_3;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    _b.trys.push([0, 5, , 6]);
                    _a = req.body, patientId = _a.patientId, messages = _a.messages;
                    return [4 /*yield*/, patientModel.findById(patientId).exec()];
                case 1:
                    patient = _b.sent();
                    if (!patient) {
                        return [2 /*return*/, res.status(404).json({ message: 'Paciente não encontrado.' })];
                    }
                    return [4 /*yield*/, physicianModel.findById(patient.physician).exec()];
                case 2:
                    physician = _b.sent();
                    console.log(physician);
                    if (!physician) {
                        return [2 /*return*/, res.status(404).json({ message: 'Médico não encontrado.' })];
                    }
                    // Atualizar alertas do paciente
                    if (patient.alerts.length === 0) {
                        novoAlertaPaciente = { alertNumber: 1, message: messages };
                        patient.alerts.push(novoAlertaPaciente);
                    }
                    else {
                        novoAlertaPaciente = { alertNumber: patient.alerts.length + 1, message: messages };
                        patient.alerts.push(novoAlertaPaciente);
                    }
                    return [4 /*yield*/, patient.save()];
                case 3:
                    _b.sent();
                    // Atualizar alertas do médico para o paciente em questão
                    if (physician.alerts.length === 0) {
                        novoAlertaMedico = { alertNumber: 1, patientId: patient._id, message: messages };
                        physician.alerts.push(novoAlertaMedico);
                    }
                    else {
                        novoAlertaMedico = { alertNumber: physician.alerts.length + 1, patientId: patient._id, message: messages };
                        physician.alerts.push(novoAlertaMedico);
                    }
                    console.log(physician.alerts);
                    return [4 /*yield*/, physician.save()];
                case 4:
                    _b.sent();
                    console.log(physician.alerts);
                    res.json({ message: 'Alertas enviados com sucesso.' });
                    return [3 /*break*/, 6];
                case 5:
                    error_3 = _b.sent();
                    console.error('Erro ao enviar alertas:', error_3);
                    res.status(500).json({ message: 'Erro interno do servidor.' });
                    return [3 /*break*/, 6];
                case 6: return [2 /*return*/];
            }
        });
    });
});
// Rota para remover utilizadores da base de dados (apenas o adminsitrador pode aceder a esta rota) - DELETE http://localhost:8080/med/DeleteUser/:user_id
router.delete('/DeleteUser/:user_id', VerifyToken, function (req, res) {
    return __awaiter(this, void 0, void 0, function () {
        var deletedUser, error_4;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, hasRole(req.user, 'administrator', res)];
                case 1:
                    if (!_a.sent()) return [3 /*break*/, 6];
                    _a.label = 2;
                case 2:
                    _a.trys.push([2, 4, , 5]);
                    return [4 /*yield*/, userModel.findByIdAndDelete(req.params.user_id)];
                case 3:
                    deletedUser = _a.sent();
                    if (!deletedUser) {
                        return [2 /*return*/, res.status(404).json({ message: 'Utilizador não encontrado' })];
                    }
                    res.json({ message: 'Utilizador removido com sucesso' });
                    return [3 /*break*/, 5];
                case 4:
                    error_4 = _a.sent();
                    console.error('Erro ao remover utilizador:', error_4);
                    res.status(500).json({ message: 'Erro do servidor.' });
                    return [3 /*break*/, 5];
                case 5: return [3 /*break*/, 7];
                case 6: return [2 /*return*/, res.status(403).send({ auth: false, token: null, message: 'Não tem autorização!' })];
                case 7: return [2 /*return*/];
            }
        });
    });
});
// Rota para listar todos os utilizadores - GET http://localhost:8080/med/ListUsers
router.get('/ListUsers', VerifyToken, function (req, res) {
    return __awaiter(this, void 0, void 0, function () {
        var users, error_5;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, hasRole(req.user, 'administrator', res)];
                case 1:
                    if (!_a.sent()) return [3 /*break*/, 6];
                    _a.label = 2;
                case 2:
                    _a.trys.push([2, 4, , 5]);
                    return [4 /*yield*/, userModel.find().exec()];
                case 3:
                    users = _a.sent();
                    console.log(users);
                    if (users.length === 0) {
                        return [2 /*return*/, res.status(404).json({ message: 'Nenhum utilizador encontrado.' })];
                    }
                    res.json(users);
                    return [3 /*break*/, 5];
                case 4:
                    error_5 = _a.sent();
                    res.status(500).json({ message: 'Erro do servidor!' });
                    return [3 /*break*/, 5];
                case 5: return [3 /*break*/, 7];
                case 6:
                    res.status(405).json({ message: 'Não tem permissão!' });
                    _a.label = 7;
                case 7: return [2 /*return*/];
            }
        });
    });
});
function hasRole(userEmail, role, res) {
    return __awaiter(this, void 0, void 0, function () {
        var user;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, userModel.findOne({ email: userEmail }).exec()];
                case 1:
                    user = _a.sent();
                    console.log(user.isAdmin);
                    if (!user) {
                        res.json({ success: false, message: 'Falha na autenticação.' });
                        return [2 /*return*/, false];
                    }
                    else {
                        if ((role === 'administrator' && user.isAdmin === true) || (role === 'physician' && user.isAdmin === false))
                            return [2 /*return*/, true];
                    }
                    return [2 /*return*/, false];
            }
        });
    });
}
module.exports = router;
