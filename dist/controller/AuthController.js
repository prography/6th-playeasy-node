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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthController = void 0;
var BaseController_1 = require("./BaseController");
var routing_controllers_1 = require("routing-controllers");
var axios_1 = __importDefault(require("axios"));
var querystring_1 = __importDefault(require("querystring"));
var request_1 = __importDefault(require("request"));
var AuthService_1 = require("../service/AuthService");
var AuthController = /** @class */ (function (_super) {
    __extends(AuthController, _super);
    function AuthController(authService) {
        var _this = _super.call(this) || this;
        _this.authService = authService;
        return _this;
    }
    AuthController.prototype.main = function () {
        console.log('login page');
    };
    AuthController.prototype.kakaoCheck = function () {
        var kakaoAuthUrl = "https://kauth.kakao.com/oauth/authorize?client_id=" + process.env.KAKAO_CLIENT_ID + "&redirect_uri=" + process.env.KAKAO_REDIRECT_URI + "&response_type=code";
        return request_1.default.post(kakaoAuthUrl, function (err, httpResponse, body) { });
    };
    AuthController.prototype.kakao = function (request) {
        return __awaiter(this, void 0, void 0, function () {
            var kakaoToken;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, axios_1.default({
                            method: "POST",
                            url: "https://kauth.kakao.com/oauth/token",
                            headers: {
                                "content-type": "application/x-www-form-urlencoded"
                            },
                            data: querystring_1.default.stringify({
                                code: request.query.code,
                                grant_type: "authorization_code",
                                client_id: process.env.KAKAO_CLIENT_ID,
                                client_secret: process.env.KAKAO_CLIENT_SECRET,
                                redirect_uri: process.env.KAKAO_REDIRECT_URI
                            })
                        })];
                    case 1:
                        kakaoToken = _a.sent();
                        return [2 /*return*/, { access_token: kakaoToken.data.access_token }];
                }
            });
        });
    };
    AuthController.prototype.login = function (access_token) {
        return __awaiter(this, void 0, void 0, function () {
            var kakaoUserInfo, email, data;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, axios_1.default({
                            method: "GET",
                            url: "https://kapi.kakao.com/v2/user/me",
                            headers: { Authorization: "Bearer " + access_token }
                        })];
                    case 1:
                        kakaoUserInfo = _a.sent();
                        email = kakaoUserInfo.data.kakao_account.email;
                        if (!email)
                            throw new routing_controllers_1.NotFoundError('카카오 인증에 실패했습니다.');
                        return [4 /*yield*/, this.authService.login(email)];
                    case 2:
                        data = _a.sent();
                        return [2 /*return*/, data];
                }
            });
        });
    };
    __decorate([
        routing_controllers_1.Get() // 카카오 로그인 테스트용 api
        ,
        routing_controllers_1.Render('view.html'),
        __metadata("design:type", Function),
        __metadata("design:paramtypes", []),
        __metadata("design:returntype", void 0)
    ], AuthController.prototype, "main", null);
    __decorate([
        routing_controllers_1.Get('/kakao') // 카카오 로그인 테스트용 api
        ,
        __metadata("design:type", Function),
        __metadata("design:paramtypes", []),
        __metadata("design:returntype", void 0)
    ], AuthController.prototype, "kakaoCheck", null);
    __decorate([
        routing_controllers_1.Get('/kakao/callback') // 카카오 로그인 테스트용 api
        ,
        __param(0, routing_controllers_1.Req()),
        __metadata("design:type", Function),
        __metadata("design:paramtypes", [Object]),
        __metadata("design:returntype", Promise)
    ], AuthController.prototype, "kakao", null);
    __decorate([
        routing_controllers_1.Post('/login'),
        __param(0, routing_controllers_1.BodyParam('access_token')),
        __metadata("design:type", Function),
        __metadata("design:paramtypes", [String]),
        __metadata("design:returntype", Promise)
    ], AuthController.prototype, "login", null);
    AuthController = __decorate([
        routing_controllers_1.JsonController('/auth'),
        __metadata("design:paramtypes", [AuthService_1.AuthService])
    ], AuthController);
    return AuthController;
}(BaseController_1.BaseController));
exports.AuthController = AuthController;
