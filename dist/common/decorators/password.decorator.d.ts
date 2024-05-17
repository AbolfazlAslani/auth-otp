import { ValidationArguments, ValidatorConstraintInterface, ValidatorOptions } from "class-validator";
export declare function ConfirmPassword(property: string, validationOption?: ValidatorOptions): (object: any, propertyName: string) => void;
export declare class ConfirmedPasswordConstraints implements ValidatorConstraintInterface {
    validate(value: any, args?: ValidationArguments): boolean;
    defaultMessage(validationArguments?: ValidationArguments): string;
}
