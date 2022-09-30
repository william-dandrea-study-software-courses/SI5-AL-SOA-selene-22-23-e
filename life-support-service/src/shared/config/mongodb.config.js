"use strict";
exports.__esModule = true;
var config_1 = require("@nestjs/config");
exports["default"] = (0, config_1.registerAs)('mongodb', function () { return ({
    host: process.env.MONGODB_HOST,
    port: parseInt(process.env.MONGODB_PORT, 10) || 27017,
    database: process.env.MONGODB_DATABASE
}); });
