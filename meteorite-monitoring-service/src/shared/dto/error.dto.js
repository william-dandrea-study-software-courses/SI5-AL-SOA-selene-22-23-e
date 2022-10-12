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
exports.ErrorDto = void 0;
var common_1 = require("@nestjs/common");
var ErrorDto = /** @class */ (function (_super) {
    __extends(ErrorDto, _super);
    function ErrorDto(status, error, details) {
        if (details === void 0) { details = ''; }
        var _this = _super.call(this, { error: error, details: details }, status) || this;
        _this.error = error;
        _this.details = details;
        return _this;
    }
    return ErrorDto;
}(common_1.HttpException));
exports.ErrorDto = ErrorDto;
