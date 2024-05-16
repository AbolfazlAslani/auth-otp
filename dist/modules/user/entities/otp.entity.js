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
exports.otpEntity = void 0;
const typeorm_1 = require("typeorm");
const user_entity_1 = require("./user.entity");
let otpEntity = class otpEntity {
};
exports.otpEntity = otpEntity;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)("increment"),
    __metadata("design:type", Number)
], otpEntity.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], otpEntity.prototype, "code", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", Date)
], otpEntity.prototype, "expires_in", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", Number)
], otpEntity.prototype, "userId", void 0);
__decorate([
    (0, typeorm_1.OneToOne)(() => user_entity_1.UserEntity, user => user.otp, { onDelete: "CASCADE" }),
    __metadata("design:type", user_entity_1.UserEntity)
], otpEntity.prototype, "user", void 0);
exports.otpEntity = otpEntity = __decorate([
    (0, typeorm_1.Entity)('otp')
], otpEntity);
//# sourceMappingURL=otp.entity.js.map