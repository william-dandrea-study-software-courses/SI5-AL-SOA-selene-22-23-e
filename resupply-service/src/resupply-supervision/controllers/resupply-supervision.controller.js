"use strict";
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
exports.ResupplySupervisionController = void 0;
var common_1 = require("@nestjs/common");
var swagger_1 = require("@nestjs/swagger");
var resupply_mission_not_exist_exception_1 = require("../exceptions/resupply-mission-not-exist.exception");
var ResupplySupervisionController = /** @class */ (function () {
    function ResupplySupervisionController(resupplySupervisionService) {
        this.resupplySupervisionService = resupplySupervisionService;
        this.logger = new common_1.Logger(ResupplySupervisionController_1.name);
    }
    ResupplySupervisionController_1 = ResupplySupervisionController;
    ResupplySupervisionController.prototype.supply = function (supplyOrderDTO) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                this.logger.log("Création de la DTO supply");
                return [2 /*return*/, this.resupplySupervisionService.resupply(supplyOrderDTO)];
            });
        });
    };
    ResupplySupervisionController.prototype.retrieveResupplyMissionsStatus = function () {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                this.logger.log("Récupération du statut des différentes missions de réapprovisionnement");
                return [2 /*return*/, this.resupplySupervisionService.retrieveResupplyMissionsStatus()];
            });
        });
    };
    ResupplySupervisionController.prototype.getResupplyOrder = function () {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                this.logger.log("Récupération des commandes");
                return [2 /*return*/, this.resupplySupervisionService.getResupplyOrder()];
            });
        });
    };
    ResupplySupervisionController.prototype.validate = function (supplyOrder) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                this.logger.log("Validation d'une commande");
                return [2 /*return*/, this.resupplySupervisionService.validateOrder(supplyOrder)];
            });
        });
    };
    ResupplySupervisionController.prototype.send = function (resupplyMissionId) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                this.logger.log("Envoie d'une fusée");
                return [2 /*return*/, this.resupplySupervisionService.send(resupplyMissionId)];
            });
        });
    };
    var ResupplySupervisionController_1;
    __decorate([
        (0, swagger_1.ApiOkResponse)({ type: Boolean }),
        (0, common_1.Post)("/supply"),
        (0, common_1.HttpCode)(200),
        __param(0, (0, common_1.Body)())
    ], ResupplySupervisionController.prototype, "supply");
    __decorate([
        (0, swagger_1.ApiOkResponse)({ type: Boolean }),
        (0, common_1.Get)("/rocketStatus")
    ], ResupplySupervisionController.prototype, "retrieveResupplyMissionsStatus");
    __decorate([
        (0, swagger_1.ApiOkResponse)({ type: Boolean }),
        (0, common_1.Get)("/supplyOrders")
    ], ResupplySupervisionController.prototype, "getResupplyOrder");
    __decorate([
        (0, swagger_1.ApiOkResponse)({ type: Boolean }),
        (0, common_1.Put)("/:supplyOrderId/validate"),
        (0, common_1.HttpCode)(200),
        __param(0, (0, common_1.Param)("supplyOrderId"))
    ], ResupplySupervisionController.prototype, "validate");
    __decorate([
        (0, swagger_1.ApiOkResponse)({ type: Boolean }),
        (0, common_1.Put)("/:resupplyMissionId/send"),
        (0, swagger_1.ApiConflictResponse)({
            type: resupply_mission_not_exist_exception_1.ResupplyMissionNotExist,
            description: "Resupply mission does not exist"
        }),
        (0, common_1.HttpCode)(200),
        __param(0, (0, common_1.Param)("resupplyMissionId"))
    ], ResupplySupervisionController.prototype, "send");
    ResupplySupervisionController = ResupplySupervisionController_1 = __decorate([
        (0, swagger_1.ApiTags)("resupply-supervision"),
        (0, common_1.Controller)("/resupply-supervision")
    ], ResupplySupervisionController);
    return ResupplySupervisionController;
}());
exports.ResupplySupervisionController = ResupplySupervisionController;
