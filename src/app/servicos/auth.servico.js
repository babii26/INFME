"use strict";
var __esDecorate = (this && this.__esDecorate) || function (ctor, descriptorIn, decorators, contextIn, initializers, extraInitializers) {
    function accept(f) { if (f !== void 0 && typeof f !== "function") throw new TypeError("Function expected"); return f; }
    var kind = contextIn.kind, key = kind === "getter" ? "get" : kind === "setter" ? "set" : "value";
    var target = !descriptorIn && ctor ? contextIn["static"] ? ctor : ctor.prototype : null;
    var descriptor = descriptorIn || (target ? Object.getOwnPropertyDescriptor(target, contextIn.name) : {});
    var _, done = false;
    for (var i = decorators.length - 1; i >= 0; i--) {
        var context = {};
        for (var p in contextIn) context[p] = p === "access" ? {} : contextIn[p];
        for (var p in contextIn.access) context.access[p] = contextIn.access[p];
        context.addInitializer = function (f) { if (done) throw new TypeError("Cannot add initializers after decoration has completed"); extraInitializers.push(accept(f || null)); };
        var result = (0, decorators[i])(kind === "accessor" ? { get: descriptor.get, set: descriptor.set } : descriptor[key], context);
        if (kind === "accessor") {
            if (result === void 0) continue;
            if (result === null || typeof result !== "object") throw new TypeError("Object expected");
            if (_ = accept(result.get)) descriptor.get = _;
            if (_ = accept(result.set)) descriptor.set = _;
            if (_ = accept(result.init)) initializers.unshift(_);
        }
        else if (_ = accept(result)) {
            if (kind === "field") initializers.unshift(_);
            else descriptor[key] = _;
        }
    }
    if (target) Object.defineProperty(target, contextIn.name, descriptor);
    done = true;
};
var __runInitializers = (this && this.__runInitializers) || function (thisArg, initializers, value) {
    var useValue = arguments.length > 2;
    for (var i = 0; i < initializers.length; i++) {
        value = useValue ? initializers[i].call(thisArg, value) : initializers[i].call(thisArg);
    }
    return useValue ? value : void 0;
};
var __setFunctionName = (this && this.__setFunctionName) || function (f, name, prefix) {
    if (typeof name === "symbol") name = name.description ? "[".concat(name.description, "]") : "";
    return Object.defineProperty(f, "name", { configurable: true, value: prefix ? "".concat(prefix, " ", name) : name });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthService = void 0;
const core_1 = require("@angular/core");
const http_1 = require("@angular/common/http");
const rxjs_1 = require("rxjs");
const operators_1 = require("rxjs/operators");
let AuthService = (() => {
    let _classDecorators = [(0, core_1.Injectable)({
            providedIn: 'root'
        })];
    let _classDescriptor;
    let _classExtraInitializers = [];
    let _classThis;
    var AuthService = _classThis = class {
        // Inicializar o construtor com estes parâmetros já que os métodos desta classe fazem requisições HTTP e navegabilidade (classe Router)
        constructor(http, router) {
            this.http = http;
            this.router = router;
            this.baseUrl = 'http://localhost:8080/med'; // URL base da aplicação backend
            this.currentUser = {
                name: '',
                password: '',
                email: '',
                isAdmin: false,
                _id: ''
            };
            this.currentPatient = {
                physician: '',
                user: '',
                formAnswers: {
                    personalInfo: {
                        age: null,
                        gender: null
                    },
                    medicalHistory: {
                        comorbidities: []
                    },
                    lifestyle: {
                        exercisesRegularly: null,
                        smokes: null
                    },
                    familyHistory: {
                        cancer: null,
                        heartDisease: null
                    }
                },
                alerts: [
                    {
                        alertNumber: 0,
                        message: []
                    }
                ],
                _id: ''
            };
            this.userId = '';
            this.userToken = null;
            this.userType = null;
            this.physicianID = null;
            this.patientID = null;
            if (typeof window !== 'undefined') { // Garantir que o localStorage só está a ser acedido a partir do lado cliente
                this.userToken = localStorage.getItem('userToken');
                this.userId = localStorage.getItem('userId') || '';
                this.userType = localStorage.getItem('userType');
                this.physicianID = localStorage.getItem('physicianID');
                this.patientID = localStorage.getItem('patientID');
            }
        }
        // Envia uma requisição HTTP ao backend para fazer o login. Os dados do utilizador (ID, token, tipo) são guardados. 
        login(email, password) {
            const headers = new http_1.HttpHeaders({ 'Content-Type': 'application/json' });
            const body = JSON.stringify({ email, password });
            return this.http.post(`${this.baseUrl}/login`, body, { headers }).pipe((0, operators_1.switchMap)((response) => {
                if (response && response.token) {
                    this.userId = response.userId;
                    this.userType = response.userType;
                    this.userToken = response.token;
                    if (typeof window !== 'undefined') {
                        localStorage.setItem('userToken', this.userToken);
                        localStorage.setItem('userId', this.userId);
                        localStorage.setItem('userType', this.userType);
                    }
                    return this.getCurrentUser().pipe((0, operators_1.switchMap)((user) => {
                        this.currentUser = user;
                        if (response.userType === 'physician') { // Se for médico, é obtido o ID do médico que corresponde ao user em questão
                            return this.fetchPhysicianId(response.userId).pipe((0, operators_1.map)((physicianId) => {
                                this.physicianID = physicianId;
                                localStorage.setItem('physicianID', physicianId);
                                return response;
                            }));
                        }
                        else if (response.userType === 'patient') { // Se for paciente, são carregados os dados do paciente que corresponde ao user em questão
                            return this.fetchPatientById(response.userId).pipe((0, operators_1.map)((patient) => {
                                this.currentPatient = patient;
                                localStorage.setItem('patientID', patient._id);
                                return response;
                            }));
                        }
                        else {
                            return (0, rxjs_1.of)(response);
                        }
                    }));
                }
                return (0, rxjs_1.of)(null); // Retorna null se não houver uma resposta adequada
            }));
        }
        //POST para registar um novo utilizador 
        createUser(user) {
            return this.http.post(this.baseUrl + '/Register/User', user);
        }
        // GET para Listar os utilizadores todos (adm)
        getUsers() {
            const token = typeof window !== 'undefined' ? localStorage.getItem('userToken') : '';
            const headers = new http_1.HttpHeaders().set('x-access-token', token || '');
            return this.http.get(this.baseUrl + '/ListUsers', { headers }).pipe((0, operators_1.catchError)((error) => {
                console.error('Erro ao buscar utilizadores', error);
                return (0, rxjs_1.throwError)(error);
            }));
        }
        // Obter o médico através do ID do utilizador
        fetchPhysician(userId) {
            const token = typeof window !== 'undefined' ? localStorage.getItem('userToken') : '';
            const headers = new http_1.HttpHeaders().set('x-access-token', token || '');
            const url = `${this.baseUrl}/physicians/user/${userId}`;
            return this.http.get(url, { headers }).pipe((0, operators_1.map)((response) => (response === null || response === void 0 ? void 0 : response.physician) || null), // Extraia o physician do objeto retornado
            (0, operators_1.catchError)((error) => {
                console.error('Error fetching physician:', error);
                return (0, rxjs_1.of)(null); // Retorna um Observable com valor null em caso de erro
            }));
        }
        // Obter o ID do médico através do seu ID de utilizador
        fetchPhysicianId(userId) {
            const token = typeof window !== 'undefined' ? localStorage.getItem('userToken') : '';
            const headers = new http_1.HttpHeaders().set('x-access-token', token || '');
            return this.http.get(`${this.baseUrl}/physicians/user/${userId}`, { headers }).pipe((0, operators_1.map)((response) => response.physicianId));
        }
        // Obter o paciente através do seu ID de utilizador
        fetchPatientById(userId) {
            const token = typeof window !== 'undefined' ? localStorage.getItem('userToken') : '';
            const headers = new http_1.HttpHeaders().set('x-access-token', token || '');
            return this.http.get(`${this.baseUrl}/patients/user/${userId}`, { headers }).pipe((0, operators_1.map)((response) => response.patient));
        }
        // Listar os pacientes através do ID do médico
        listPatientByPhysicianId() {
            const token = typeof window !== 'undefined' ? localStorage.getItem('userToken') : '';
            const physician_id = typeof window !== 'undefined' ? localStorage.getItem('physicianID') : '';
            const headers = new http_1.HttpHeaders().set('x-access-token', token || '');
            return this.http.get(`${this.baseUrl}/ListPatients/${physician_id}`, { headers }).pipe((0, operators_1.map)((response) => response.patients));
        }
        // Método invocado após o login para obter os dados do utilizador atual 
        getCurrentUser() {
            const token = typeof window !== 'undefined' ? localStorage.getItem('userToken') : '';
            const user_id = typeof window !== 'undefined' ? localStorage.getItem('userId') : '';
            const headers = new http_1.HttpHeaders().set('x-access-token', token || '');
            return this.http.get(`${this.baseUrl}/Users/${user_id}`, { headers }).pipe((0, operators_1.map)((response) => response.user));
        }
        // DELETE para remover um utilizador específico
        deleteUser(userId) {
            const token = typeof window !== 'undefined' ? localStorage.getItem('userToken') : '';
            const headers = new http_1.HttpHeaders().set('x-access-token', token || '');
            return this.http.delete(`${this.baseUrl}/DeleteUser/${userId}`, { headers }).pipe((0, operators_1.catchError)((error) => {
                throw 'Erro ao excluir o utilizador: ' + error.message;
            }));
        }
        // Retorna o token do utilizador atual
        getCurrentUserToken() {
            return this.userToken;
        }
        // Carrega os dados do paciente atual através do método GET
        getCurrentPatient() {
            const patient_id = typeof window !== 'undefined' ? localStorage.getItem('patientID') : '';
            return this.http.get(`${this.baseUrl}/patients/${patient_id}`).pipe((0, operators_1.map)((response) => response.patient));
        }
        // "Limpa" os dados todos após logout e redireciona o utilizador para a página inicial
        logout() {
            this.userToken = null;
            this.userId = '';
            this.userToken = null;
            this.userType = null;
            this.physicianID = null;
            this.patientID = null;
            // Limpa as variáveis guardadas no localStorage
            if (typeof window !== 'undefined') {
                localStorage.removeItem('userToken');
                localStorage.removeItem('userId');
                localStorage.removeItem('userType');
                localStorage.removeItem('physicianID');
                localStorage.removeItem('patientID');
            }
            this.currentUser = {
                name: '',
                password: '',
                email: '',
                isAdmin: false,
                _id: ''
            };
            this.currentPatient = {
                physician: '',
                user: '',
                formAnswers: {
                    personalInfo: {
                        age: null,
                        gender: null
                    },
                    medicalHistory: {
                        comorbidities: []
                    },
                    lifestyle: {
                        exercisesRegularly: null,
                        smokes: null
                    },
                    familyHistory: {
                        cancer: null,
                        heartDisease: null
                    }
                },
                alerts: [
                    {
                        alertNumber: 0,
                        message: []
                    }
                ],
                _id: ''
            };
            this.router.navigate(['/login']);
        }
    };
    __setFunctionName(_classThis, "AuthService");
    (() => {
        const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
        __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
        AuthService = _classThis = _classDescriptor.value;
        if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
        __runInitializers(_classThis, _classExtraInitializers);
    })();
    return AuthService = _classThis;
})();
exports.AuthService = AuthService;
