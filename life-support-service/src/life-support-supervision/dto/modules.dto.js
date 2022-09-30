"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
exports.ModuleDto = void 0;
var class_validator_1 = require("class-validator");
var swagger_1 = require("@nestjs/swagger");
var ModuleDto = /** @class */ (function () {
    function ModuleDto() {
    }
    __decorate([
        (0, swagger_1.ApiProperty)({ description: "The id of the Moon Module", minimum: 0 }),
        (0, class_validator_1.IsNotEmpty)(),
        (0, class_validator_1.IsNumber)()
    ], ModuleDto.prototype, "id_module");
    __decorate([
        (0, swagger_1.ApiProperty)({ description: "Status of the Moon Module (true if status is UP, false if status is DOWN" }),
        (0, class_validator_1.IsNotEmpty)(),
        (0, class_validator_1.IsBoolean)()
    ], ModuleDto.prototype, "lifeStatus");
    return ModuleDto;
}());
exports.ModuleDto = ModuleDto;
