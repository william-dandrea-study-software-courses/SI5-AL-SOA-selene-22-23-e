"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
exports.ResupplyMissionOrderSchema = exports.ResupplyMissionOrder = void 0;
var mongoose_1 = require("@nestjs/mongoose");
var swagger_1 = require("@nestjs/swagger");
var status_resupply_enum_schema_1 = require("./status-resupply-enum.schema");
var supply_order_schema_1 = require("./supply-order.schema");
var ResupplyMissionOrder = /** @class */ (function () {
    function ResupplyMissionOrder() {
    }
    __decorate([
        (0, swagger_1.ApiProperty)()
    ], ResupplyMissionOrder.prototype, "_id");
    __decorate([
        (0, swagger_1.ApiProperty)(),
        (0, mongoose_1.Prop)({ type: [supply_order_schema_1.SupplyOrderSchema] })
    ], ResupplyMissionOrder.prototype, "orders");
    __decorate([
        (0, swagger_1.ApiProperty)(),
        (0, mongoose_1.Prop)({ type: String, "enum": status_resupply_enum_schema_1.StatusResupplyEnumSchema })
    ], ResupplyMissionOrder.prototype, "state");
    ResupplyMissionOrder = __decorate([
        (0, mongoose_1.Schema)({
            versionKey: false
        })
    ], ResupplyMissionOrder);
    return ResupplyMissionOrder;
}());
exports.ResupplyMissionOrder = ResupplyMissionOrder;
exports.ResupplyMissionOrderSchema = mongoose_1.SchemaFactory.createForClass(ResupplyMissionOrder);
