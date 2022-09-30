"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
exports.NeedsControleServiceModule = void 0;
var common_1 = require("@nestjs/common");
var needs_control_service_controller_1 = require("./controllers/needs-control-service.controller");
var needs_control_service_service_1 = require("./services/needs-control-service.service");
var axios_1 = require("@nestjs/axios");
var mongoose_1 = require("@nestjs/mongoose");
var status_life_module_schema_1 = require("./schemas/status-life-module.schema");
var NeedsControleServiceModule = /** @class */ (function () {
    function NeedsControleServiceModule() {
    }
    NeedsControleServiceModule = __decorate([
        (0, common_1.Module)({
            controllers: [needs_control_service_controller_1.NeedsControlServiceController],
            providers: [needs_control_service_service_1.NeedsControlServiceService],
            imports: [
                axios_1.HttpModule,
                mongoose_1.MongooseModule.forFeature([{ name: status_life_module_schema_1.Needs.name, schema: status_life_module_schema_1.NeedsSchema }]),
            ]
        })
    ], NeedsControleServiceModule);
    return NeedsControleServiceModule;
}());
exports.NeedsControleServiceModule = NeedsControleServiceModule;
