"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        if (typeof b !== "function" && b !== null)
            throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
exports.__esModule = true;
exports.ResupplyMissionNotExist = void 0;
var common_1 = require("@nestjs/common");
var ResupplyMissionNotExist = /** @class */ (function (_super) {
    __extends(ResupplyMissionNotExist, _super);
    function ResupplyMissionNotExist(idResupply) {
        var _this = _super.call(this, { 'Resupply mission does not exist': "No mission has the id : \"".concat(idResupply, "\"") }, common_1.HttpStatus.NOT_FOUND) || this;
        _this.error = 'Resupply mission does not exist';
        _this.details = "No mission has the id : \"".concat(idResupply, "\"");
        return _this;
    }
    return ResupplyMissionNotExist;
}(common_1.HttpException));
exports.ResupplyMissionNotExist = ResupplyMissionNotExist;
