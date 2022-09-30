"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
exports.AppModule = void 0;
var common_1 = require("@nestjs/common");
var config_1 = require("@nestjs/config");
var mongoose_1 = require("@nestjs/mongoose");
var app_config_1 = require("./shared/config/app.config");
var mongodb_config_1 = require("./shared/config/mongodb.config");
var swaggerui_config_1 = require("./shared/config/swaggerui.config");
var mongoose_config_service_1 = require("./shared/services/mongoose-config.service");
var health_module_1 = require("./health/health.module");
var life_support_supervision_module_1 = require("./life-support-supervision/life-support-supervision.module");
var AppModule = /** @class */ (function () {
    function AppModule() {
    }
    AppModule = __decorate([
        (0, common_1.Module)({
            imports: [
                config_1.ConfigModule.forRoot({
                    isGlobal: true,
                    load: [app_config_1["default"], mongodb_config_1["default"], swaggerui_config_1["default"]]
                }),
                mongoose_1.MongooseModule.forRootAsync({
                    useClass: mongoose_config_service_1.MongooseConfigService
                }),
                health_module_1.HealthModule,
                life_support_supervision_module_1.LifeSupportSupervisionModule,
            ],
            providers: []
        })
    ], AppModule);
    return AppModule;
}());
exports.AppModule = AppModule;
