"use strict";
exports.__esModule = true;
var config_1 = require("@nestjs/config");
exports["default"] = (0, config_1.registerAs)('app', function () { return ({
    port: parseInt(process.env.APP_PORT, 10) || 3000,
    name: process.env.APP_NAME
}); });
