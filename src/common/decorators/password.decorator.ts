import { ValidationArguments, ValidatorConstraint, ValidatorConstraintInterface, ValidatorOptions, registerDecorator } from "class-validator";


export function ConfirmPassword(property:string ,validationOption?:  ValidatorOptions){
    return (object: any , propertyName: string)=>{
        registerDecorator({
            target : object.constructor,
            propertyName,
            options : validationOption,
            constraints : [property],
            validator :ConfirmedPasswordConstraints
        })
    
    }    

}

@ValidatorConstraint({
    name : "ConfirmedPassword",
    async : false
})
export class ConfirmedPasswordConstraints implements ValidatorConstraintInterface{
    validate(value: any, args?: ValidationArguments){
           const {object,constraints} = args;
           const [property] = constraints;
           const relatedValue = object[property]
           return value === relatedValue
    }
    defaultMessage(validationArguments?: ValidationArguments): string {
            return "password and confirm password should be equal"
    }

}