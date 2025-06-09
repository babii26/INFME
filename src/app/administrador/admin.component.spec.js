"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const testing_1 = require("@angular/core/testing");
const admin_component_1 = require("./admin.component");
const node_test_1 = require("node:test");
(0, node_test_1.describe)('AdminComponent', () => {
    let component;
    let fixture;
    (0, node_test_1.beforeEach)(() => __awaiter(void 0, void 0, void 0, function* () {
        yield testing_1.TestBed.configureTestingModule({
            declarations: [admin_component_1.AdminComponent]
        })
            .compileComponents();
        fixture = testing_1.TestBed.createComponent(admin_component_1.AdminComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    }));
});
function expect(component) {
    throw new Error('Function not implemented.');
}
