"use strict";
exports.__esModule = true;
var config_1 = require("@nestjs/config");
exports["default"] = (0, config_1.registerAs)('dependencies', function () { return ({
    menu_service_url_with_port: process.env.MENU_SERVICE_URL_WITH_PORT,
    kitchen_service_url_with_port: process.env.KITCHEN_SERVICE_URL_WITH_PORT
}); });
