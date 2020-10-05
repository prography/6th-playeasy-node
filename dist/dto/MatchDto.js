"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ResponseMatchDto = exports.UpdateMatchDto = exports.CreateMatchDto = void 0;
var class_validator_1 = require("class-validator");
var class_transformer_1 = require("class-transformer");
var Enums_1 = require("../util/Enums");
var CreateMatchDto = /** @class */ (function () {
    function CreateMatchDto() {
    }
    return CreateMatchDto;
}());
exports.CreateMatchDto = CreateMatchDto;
var UpdateMatchDto = /** @class */ (function () {
    function UpdateMatchDto() {
    }
    return UpdateMatchDto;
}());
exports.UpdateMatchDto = UpdateMatchDto;
var ResponseMatchDto = /** @class */ (function () {
    function ResponseMatchDto() {
    }
    __decorate([
        class_transformer_1.Expose(),
        class_validator_1.IsNotEmpty(),
        __metadata("design:type", Number)
    ], ResponseMatchDto.prototype, "id", void 0);
    __decorate([
        class_transformer_1.Expose(),
        __metadata("design:type", String)
    ], ResponseMatchDto.prototype, "type", void 0);
    __decorate([
        class_transformer_1.Expose(),
        __metadata("design:type", String)
    ], ResponseMatchDto.prototype, "description", void 0);
    __decorate([
        class_transformer_1.Expose(),
        __metadata("design:type", Date)
    ], ResponseMatchDto.prototype, "startAt", void 0);
    __decorate([
        class_transformer_1.Expose(),
        __metadata("design:type", Number)
    ], ResponseMatchDto.prototype, "duration", void 0);
    __decorate([
        class_transformer_1.Expose(),
        __metadata("design:type", Number)
    ], ResponseMatchDto.prototype, "fee", void 0);
    __decorate([
        class_transformer_1.Expose(),
        __metadata("design:type", String)
    ], ResponseMatchDto.prototype, "phone", void 0);
    __decorate([
        class_transformer_1.Expose(),
        __metadata("design:type", Number)
    ], ResponseMatchDto.prototype, "quota", void 0);
    __decorate([
        class_transformer_1.Expose(),
        __metadata("design:type", String)
    ], ResponseMatchDto.prototype, "status", void 0);
    ResponseMatchDto = __decorate([
        class_transformer_1.Exclude()
    ], ResponseMatchDto);
    return ResponseMatchDto;
}());
exports.ResponseMatchDto = ResponseMatchDto;
