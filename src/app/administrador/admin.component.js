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
exports.AdminComponent = void 0;
const core_1 = require("@angular/core");
const common_1 = require("@angular/common");
let AdminComponent = (() => {
    let _classDecorators = [(0, core_1.Component)({
            selector: 'app-admin',
            imports: [common_1.CommonModule],
            standalone: true,
            templateUrl: './admin.component.html',
            styleUrl: './admin.component.css'
        })];
    let _classDescriptor;
    let _classExtraInitializers = [];
    let _classThis;
    var AdminComponent = _classThis = class {
        // Inicializar o construtor com estes parâmetros sempre que quisermos "injetar" serviços na componente e/ou acrescentar navegabilidade (classe Router)
        constructor(authService, router) {
            this.authService = authService;
            this.router = router;
            this.users = [];
            this.loading = true;
            this.error = null;
            this.selectedUser = {
                name: '',
                password: '',
                email: '',
                isAdmin: false,
                _id: ''
            };
        }
        // Sempre que o admin aceder a componente "Admin", é invocado o método loadUsers para listar os utilizadores atuais
        ngOnInit() {
            this.loadUsers();
        }
        goToRegister() {
            this.router.navigate(['/register']);
        }
        // Invoca o método getUsers implementado em "auth.service", que por sua vez envia a requisição HTTP ao backend para listar os utilizadores atuais
        loadUsers() {
            this.loading = true;
            this.authService.getUsers().subscribe((data) => {
                this.users = data;
                this.loading = false;
            }, (error) => {
                this.error = error.message || 'Erro ao carregar utilizadores';
                this.loading = false;
            });
        }
        // Atribui o utilizador selecionado (cujo botão foi selecionado) à variável selectedUser
        selectUser(user) {
            this.selectedUser = user;
        }
        // Remove o utilizador atribuído à variável selectedUser. O método deleteUser implementado em "auth.service" envia a requisição DELETE ao backend
        deleteUser() {
            if (confirm('Tem certeza de que deseja excluir este utilizador?')) {
                if (this.selectedUser) {
                    this.authService.deleteUser(this.selectedUser._id).subscribe((response) => {
                        console.log(response.message);
                        // Atualizar a lista de utilizadores após a exclusão
                        this.loadUsers();
                    }, () => {
                        alert('Erro ao excluir o utilizador:');
                    });
                }
            }
        }
    };
    __setFunctionName(_classThis, "AdminComponent");
    (() => {
        const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
        __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
        AdminComponent = _classThis = _classDescriptor.value;
        if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
        __runInitializers(_classThis, _classExtraInitializers);
    })();
    return AdminComponent = _classThis;
})();
exports.AdminComponent = AdminComponent;
