"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
exports.ResupplySupervisionModule = void 0;
var common_1 = require("@nestjs/common");
var resupply_supervision_controller_1 = require("./controllers/resupply-supervision.controller");
var resupply_supervision_service_1 = require("./services/resupply-supervision.service");
var axios_1 = require("@nestjs/axios");
var mongoose_1 = require("@nestjs/mongoose");
var supply_order_schema_1 = require("./schemas/supply-order.schema");
var resupply_mission_order_schema_1 = require("./schemas/resupply-mission-order.schema");
var ResupplySupervisionModule = /** @class */ (function () {
    function ResupplySupervisionModule() {
    }
    ResupplySupervisionModule = __decorate([
        (0, common_1.Module)({
            controllers: [resupply_supervision_controller_1.ResupplySupervisionController],
            providers: [resupply_supervision_service_1.ResupplySupervisionService],
            imports: [axios_1.HttpModule, mongoose_1.MongooseModule.forFeature([{ name: supply_order_schema_1.SupplyOrder.name, schema: supply_order_schema_1.SupplyOrderSchema }, { name: resupply_mission_order_schema_1.ResupplyMissionOrder.name, schema: resupply_mission_order_schema_1.ResupplyMissionOrderSchema }]),]
        })
    ], ResupplySupervisionModule);
    return ResupplySupervisionModule;
}());
exports.ResupplySupervisionModule = ResupplySupervisionModule;
