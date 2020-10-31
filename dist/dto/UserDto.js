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
exports.ResponseUserDto = exports.UpdateUserDto = void 0;
var class_validator_1 = require("class-validator");
var class_transformer_1 = require("class-transformer");
var UpdateUserDto = /** @class */ (function () {
    function UpdateUserDto() {
    }
    __decorate([
        class_validator_1.IsInt(),
        class_validator_1.Min(1),
        class_validator_1.Max(100),
        __metadata("design:type", Number)
    ], UpdateUserDto.prototype, "age", void 0);
    __decorate([
        class_validator_1.IsMobilePhone("ko-KR"),
        __metadata("design:type", String)
    ], UpdateUserDto.prototype, "phone", void 0);
    __decorate([
        class_validator_1.IsString(),
        __metadata("design:type", String)
    ], UpdateUserDto.prototype, "description", void 0);
    return UpdateUserDto;
}());
exports.UpdateUserDto = UpdateUserDto;
var ResponseUserDto = /** @class */ (function () {
    function ResponseUserDto() {
    }
    __decorate([
        class_transformer_1.Expose(),
        class_validator_1.IsNotEmpty(),
        __metadata("design:type", Number)
    ], ResponseUserDto.prototype, "id", void 0);
    __decorate([
        class_transformer_1.Expose(),
        __metadata("design:type", String)
    ], ResponseUserDto.prototype, "name", void 0);
    __decorate([
        class_transformer_1.Expose(),
        __metadata("design:type", Number)
    ], ResponseUserDto.prototype, "age", void 0);
    __decorate([
        class_transformer_1.Expose(),
        class_validator_1.IsNotEmpty(),
        __metadata("design:type", String)
    ], ResponseUserDto.prototype, "email", void 0);
    __decorate([
        class_transformer_1.Expose(),
        __metadata("design:type", String)
    ], ResponseUserDto.prototype, "phone", void 0);
    __decorate([
        class_transformer_1.Expose(),
        __metadata("design:type", String)
    ], ResponseUserDto.prototype, "socialType", void 0);
    __decorate([
        class_transformer_1.Expose(),
        __metadata("design:type", String)
    ], ResponseUserDto.prototype, "description", void 0);
    __decorate([
        class_transformer_1.Expose(),
        __metadata("design:type", String)
    ], ResponseUserDto.prototype, "picture", void 0);
    __decorate([
        class_transformer_1.Expose(),
        __metadata("design:type", String)
    ], ResponseUserDto.prototype, "teamName", void 0);
    ResponseUserDto = __decorate([
        class_transformer_1.Exclude()
    ], ResponseUserDto);
    return ResponseUserDto;
}());
exports.ResponseUserDto = ResponseUserDto;
