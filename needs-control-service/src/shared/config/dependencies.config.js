"use strict";
exports.__esModule = true;
var config_1 = require("@nestjs/config");
exports["default"] = (0, config_1.registerAs)('dependencies', function () { return ({
    module_life_service_url_with_port: process.env.MODULE_LIFE_SERVICE_URL_WITH_PORT,
    resupply_service_url_with_port: process.env.RESUPPLY_CONTROL_SERVICE_URL_WITH_PORT
}); });
