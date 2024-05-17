import { IsEmail, IsMobilePhone, IsString, Length } from "class-validator";
import { ConfirmPassword } from "src/common/decorators/password.decorator";


export class SignupDto {
    @IsString()
    first_name : string ;
    
    @IsString()
    last_name : string;
    
    @IsMobilePhone("fa-IR",{}, {message : "Your phone number format is incorrect!"})
    mobile: string;
    
    @IsString()
    @IsEmail({}, {message: "your email format is incorrect"})
    email : string;
    
    @IsString()
    @Length(6,20, {message: "your password is incorrect"})
    password : string;
    
    @IsString()
    @ConfirmPassword("password")
    confirm_password :string; 
    
}

export class LoginDto{
    @IsString()
    @IsEmail({}, {message :"your email format is incorrect !"})
    email:string ;
    
    @IsString()
    @Length(6,20, {message: "your password is incorrect"})
    password : string;

}