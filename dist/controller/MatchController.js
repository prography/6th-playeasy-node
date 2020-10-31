"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
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
Object.defineProperty(exports, "__esModule", { value: true });
exports.MatchController = void 0;
var BaseController_1 = require("./BaseController");
var routing_controllers_1 = require("routing-controllers");
var MatchService_1 = require("../service/MatchService");
var MatchDto_1 = require("../dto/MatchDto");
var LocationDto_1 = require("../dto/LocationDto");
var User_1 = require("../entity/User");
var Enums_1 = require("../util/Enums");
var MatchController = /** @class */ (function (_super) {
    __extends(MatchController, _super);
    function MatchController(matchService) {
        var _this = _super.call(this) || this;
        _this.matchService = matchService;
        return _this;
    }
    // 매치 작성
    MatchController.prototype.add = function (user, matchData, locationData) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                return [2 /*return*/];
            });
        });
    };
    // 매치 상세
    MatchController.prototype.getOne = function (user, matchId) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                return [2 /*return*/];
            });
        });
    };
    // 매치 리스트 - 메인화면
    MatchController.prototype.getList = function (date, status) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                return [2 /*return*/];
            });
        });
    };
    // 매치 수정
    MatchController.prototype.update = function (user, matchData, locationData) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                return [2 /*return*/];
            });
        });
    };
    // 매치 마감
    MatchController.prototype.close = function (user, matchId, status) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                return [2 /*return*/];
            });
        });
    };
    __decorate([
        routing_controllers_1.Post(),
        routing_controllers_1.HttpCode(201),
        __param(0, routing_controllers_1.CurrentUser({ required: true })),
        __param(1, routing_controllers_1.BodyParam('matchData')),
        __param(2, routing_controllers_1.BodyParam('locationData')),
        __metadata("design:type", Function),
        __metadata("design:paramtypes", [User_1.User,
            MatchDto_1.CreateMatchDto,
            LocationDto_1.CreateLocationDto]),
        __metadata("design:returntype", Promise)
    ], MatchController.prototype, "add", null);
    __decorate([
        routing_controllers_1.Get(),
        __param(0, routing_controllers_1.CurrentUser({ required: true })),
        __param(1, routing_controllers_1.QueryParam('matchId')),
        __metadata("design:type", Function),
        __metadata("design:paramtypes", [User_1.User, Number]),
        __metadata("design:returntype", Promise)
    ], MatchController.prototype, "getOne", null);
    __decorate([
        routing_controllers_1.Get('/list'),
        __param(0, routing_controllers_1.QueryParam('date')),
        __param(1, routing_controllers_1.QueryParam('status')),
        __metadata("design:type", Function),
        __metadata("design:paramtypes", [String, String]),
        __metadata("design:returntype", Promise)
    ], MatchController.prototype, "getList", null);
    __decorate([
        routing_controllers_1.Put() // 매치 작성자인지 확인
        ,
        __param(0, routing_controllers_1.CurrentUser({ required: true })),
        __param(1, routing_controllers_1.BodyParam('matchData')),
        __param(2, routing_controllers_1.BodyParam('locationData')),
        __metadata("design:type", Function),
        __metadata("design:paramtypes", [User_1.User,
            MatchDto_1.UpdateMatchDto,
            LocationDto_1.UpdateLocationDto]),
        __metadata("design:returntype", Promise)
    ], MatchController.prototype, "update", null);
    __decorate([
        routing_controllers_1.Put('/status') // 매치 작성자인지 확인
        ,
        __param(0, routing_controllers_1.CurrentUser({ required: true })),
        __param(1, routing_controllers_1.BodyParam('matchId')),
        __param(2, routing_controllers_1.BodyParam('status')),
        __metadata("design:type", Function),
        __metadata("design:paramtypes", [User_1.User, Number, String]),
        __metadata("design:returntype", Promise)
    ], MatchController.prototype, "close", null);
    MatchController = __decorate([
        routing_controllers_1.JsonController('/match'),
        __metadata("design:paramtypes", [MatchService_1.MatchService])
    ], MatchController);
    return MatchController;
}(BaseController_1.BaseController));
exports.MatchController = MatchController;
