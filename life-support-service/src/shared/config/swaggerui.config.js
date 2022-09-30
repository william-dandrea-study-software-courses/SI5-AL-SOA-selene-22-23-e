"use strict";
exports.__esModule = true;
var config_1 = require("@nestjs/config");
exports["default"] = (0, config_1.registerAs)('swaggerui', function () { return ({
    path: process.env.SWAGGERUI_PATH,
    title: process.env.SWAGGERUI_TITLE,
    description: process.env.SWAGGERUI_DESCRIPTION
}); });
