"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.app = void 0;
require("reflect-metadata");
var express_1 = __importDefault(require("express"));
var DatabaseConnector_1 = require("./util/DatabaseConnector");
var routing_controllers_1 = require("routing-controllers");
var typedi_1 = require("typedi");
var body_parser_1 = __importDefault(require("body-parser"));
var cookie_parser_1 = __importDefault(require("cookie-parser"));
var morgan_1 = __importDefault(require("morgan"));
var dotenv_1 = __importDefault(require("dotenv"));
var Authorization_1 = require("./util/Authorization");
var app = express_1.default();
exports.app = app;
dotenv_1.default.config();
// 데이터베이스 연결
DatabaseConnector_1.createDatabaseConnection()
    .then(function () {
    console.log('database connected');
})
    .catch(function (error) { return console.error(error); });
// 소셜 로그인 테스트를 위한 템플릿 엔진 사용
app.engine('html', require('ejs').renderFile);
app.set('view engine', 'ejs');
// 미들웨어
app.use(body_parser_1.default.urlencoded({ extended: true }));
app.use(body_parser_1.default.json());
app.use(cookie_parser_1.default());
app.use(morgan_1.default('dev'));
// 의존성 관리
routing_controllers_1.useContainer(typedi_1.Container);
// routing-controller
routing_controllers_1.useExpressServer(app, {
    routePrefix: "/api",
    cors: true,
    controllers: [__dirname + "/controller/**"],
    middlewares: [__dirname + "/middlewares/**"],
    currentUserChecker: Authorization_1.currentUserChecker,
});
