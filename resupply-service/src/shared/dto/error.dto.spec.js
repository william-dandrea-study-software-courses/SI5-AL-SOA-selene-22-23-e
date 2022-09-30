"use strict";
exports.__esModule = true;
var common_1 = require("@nestjs/common");
var error_dto_1 = require("./error.dto");
describe('ErrorDto', function () {
    it('should have empty details with default constructor', function () {
        var error = new error_dto_1.ErrorDto(common_1.HttpStatus.OK, 'my error');
        expect(error.error).toEqual('my error');
    });
    it('should have the right details', function () {
        var error = new error_dto_1.ErrorDto(common_1.HttpStatus.OK, 'my error', 'my details');
        expect(error.error).toEqual('my error');
        expect(error.details).toEqual('my details');
    });
});
