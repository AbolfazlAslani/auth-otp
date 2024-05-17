"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ConfirmedPasswordConstraints = exports.ConfirmPassword = void 0;
const class_validator_1 = require("class-validator");
function ConfirmPassword(property, validationOption) {
    return (object, propertyName) => {
        (0, class_validator_1.registerDecorator)({
            target: object.constructor,
            propertyName,
            options: validationOption,
            constraints: [property],
            validator: ConfirmedPasswordConstraints
        });
    };
}
exports.ConfirmPassword = ConfirmPassword;
let ConfirmedPasswordConstraints = class ConfirmedPasswordConstraints {
    validate(value, args) {
        const { object, constraints } = args;
        const [property] = constraints;
        const relatedValue = object[property];
        return value === relatedValue;
    }
    defaultMessage(validationArguments) {
        return "password and confirm password should be equal";
    }
};
exports.ConfirmedPasswordConstraints = ConfirmedPasswordConstraints;
exports.ConfirmedPasswordConstraints = ConfirmedPasswordConstraints = __decorate([
    (0, class_validator_1.ValidatorConstraint)({
        name: "ConfirmedPassword",
        async: false
    })
], ConfirmedPasswordConstraints);
//# sourceMappingURL=password.decorator.js.map