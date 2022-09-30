"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
exports.LifeSupportSupervisionModule = void 0;
var common_1 = require("@nestjs/common");
var life_support_supervision_controller_1 = require("./controllers/life-support-supervision.controller");
var life_support_supervision_service_1 = require("./services/life-support-supervision.service");
var module_life_proxy_service_1 = require("./services/module-life-proxy.service");
var axios_1 = require("@nestjs/axios");
var LifeSupportSupervisionModule = /** @class */ (function () {
    function LifeSupportSupervisionModule() {
    }
    LifeSupportSupervisionModule = __decorate([
        (0, common_1.Module)({
            controllers: [life_support_supervision_controller_1.LifeSupportSupervisionController],
            providers: [life_support_supervision_service_1.LifeSupportSupervisionService, module_life_proxy_service_1.ModuleLifeProxyService],
            imports: [axios_1.HttpModule]
        })
    ], LifeSupportSupervisionModule);
    return LifeSupportSupervisionModule;
}());
exports.LifeSupportSupervisionModule = LifeSupportSupervisionModule;
