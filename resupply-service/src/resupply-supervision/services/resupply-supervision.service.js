"use strict";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
exports.__esModule = true;
exports.ResupplySupervisionService = void 0;
var common_1 = require("@nestjs/common");
var resupply_mission_dto_1 = require("../dto/resupply-mission.dto");
var resupply_mission_order_schema_1 = require("../schemas/resupply-mission-order.schema");
var mongoose_1 = require("@nestjs/mongoose");
var supply_order_schema_1 = require("../schemas/supply-order.schema");
var status_resupply_enum_schema_1 = require("../schemas/status-resupply-enum.schema");
var resupply_mission_not_exist_exception_1 = require("../exceptions/resupply-mission-not-exist.exception");
var ResupplySupervisionService = /** @class */ (function () {
    function ResupplySupervisionService(resupplyMissionOrderModel, supplyOrderDocumentModel) {
        this.resupplyMissionOrderModel = resupplyMissionOrderModel;
        this.supplyOrderDocumentModel = supplyOrderDocumentModel;
    }
    ResupplySupervisionService.prototype.retrieveResupplyMissionsStatus = function () {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                return [2 /*return*/, this.resupplyMissionOrderModel.find().lean()];
            });
        });
    };
    ResupplySupervisionService.prototype.resupply = function (resupply) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.supplyOrderDocumentModel.create(__assign(__assign({}, resupply), { status: status_resupply_enum_schema_1.StatusSupplyOrderEnumSchema.PREPARING }))];
                    case 1:
                        _a.sent();
                        return [2 /*return*/, Promise.resolve()];
                }
            });
        });
    };
    ResupplySupervisionService.prototype.getResupplyOrder = function () {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                return [2 /*return*/, this.supplyOrderDocumentModel.find().lean()];
            });
        });
    };
    ResupplySupervisionService.prototype.validateOrder = function (orderId) {
        return __awaiter(this, void 0, void 0, function () {
            var test2, resupplyMission;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.supplyOrderDocumentModel.findByIdAndUpdate(orderId, { status: status_resupply_enum_schema_1.StatusSupplyOrderEnumSchema.ACCEPTED }).exec()];
                    case 1:
                        _a.sent();
                        return [4 /*yield*/, this.supplyOrderDocumentModel.findOne({ _id: orderId })];
                    case 2:
                        test2 = _a.sent();
                        return [4 /*yield*/, this.resupplyMissionOrderModel.findOne({ state: status_resupply_enum_schema_1.StatusResupplyEnumSchema.PREPARING })];
                    case 3:
                        resupplyMission = _a.sent();
                        if (!(resupplyMission === null)) return [3 /*break*/, 5];
                        return [4 /*yield*/, this.resupplyMissionOrderModel.create({ orders: [test2], state: status_resupply_enum_schema_1.StatusResupplyEnumSchema.PREPARING })];
                    case 4:
                        _a.sent();
                        return [3 /*break*/, 6];
                    case 5:
                        resupplyMission.orders.push(test2);
                        resupplyMission.save();
                        _a.label = 6;
                    case 6: return [2 /*return*/, "Commande validé"];
                }
            });
        });
    };
    ResupplySupervisionService.prototype.send = function (resupplyMissionId) {
        return __awaiter(this, void 0, void 0, function () {
            var resupplyMission, dto;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.resupplyMissionOrderModel.findOne({ _id: resupplyMissionId })];
                    case 1:
                        resupplyMission = _a.sent();
                        if (resupplyMission === null) {
                            throw new resupply_mission_not_exist_exception_1.ResupplyMissionNotExist(resupplyMissionId);
                        }
                        resupplyMission.state = status_resupply_enum_schema_1.StatusResupplyEnumSchema.TRAVELING;
                        resupplyMission.save();
                        dto = new resupply_mission_dto_1.ResupplyMissionDto();
                        dto._id = resupplyMission._id;
                        dto.orders = resupplyMission.orders;
                        dto.resupply_status = status_resupply_enum_schema_1.StatusResupplyEnumSchema.TRAVELING;
                        return [2 /*return*/, dto];
                }
            });
        });
    };
    ResupplySupervisionService = __decorate([
        (0, common_1.Injectable)(),
        __param(0, (0, mongoose_1.InjectModel)(resupply_mission_order_schema_1.ResupplyMissionOrder.name)),
        __param(1, (0, mongoose_1.InjectModel)(supply_order_schema_1.SupplyOrder.name))
    ], ResupplySupervisionService);
    return ResupplySupervisionService;
}());
exports.ResupplySupervisionService = ResupplySupervisionService;
