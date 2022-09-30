"use strict";
exports.__esModule = true;
exports.StatusSupplyOrderEnumSchema = exports.StatusResupplyEnumSchema = void 0;
var StatusResupplyEnumSchema;
(function (StatusResupplyEnumSchema) {
    StatusResupplyEnumSchema["PREPARING"] = "En cours de traitement";
    StatusResupplyEnumSchema["TRAVELING"] = "En cours d'acheminement";
    StatusResupplyEnumSchema["DONE"] = "Termin\u00E9";
})(StatusResupplyEnumSchema = exports.StatusResupplyEnumSchema || (exports.StatusResupplyEnumSchema = {}));
var StatusSupplyOrderEnumSchema;
(function (StatusSupplyOrderEnumSchema) {
    StatusSupplyOrderEnumSchema["PREPARING"] = "En cours de traitement";
    StatusSupplyOrderEnumSchema["ACCEPTED"] = "Valid\u00E9";
    StatusSupplyOrderEnumSchema["DECLINED"] = "Refus\u00E9";
})(StatusSupplyOrderEnumSchema = exports.StatusSupplyOrderEnumSchema || (exports.StatusSupplyOrderEnumSchema = {}));
