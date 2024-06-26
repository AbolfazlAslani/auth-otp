import { Body, Controller, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { CheckOtpDto, SendOtpDto } from './dto/auth.dto';
import { SignupDto } from './dto/basic.dto';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}
  
  
  @Post('send-otp')
  sendOtp(@Body() otpDto : SendOtpDto ){
      return this.authService.sendOtp(otpDto);
    
  } 
  
  @Post('check-otp')
  checkOtp(@Body() checkOtpDto : CheckOtpDto){
    return this.authService.checkOtp(checkOtpDto)
  }
  
  @Post('signup')
  signup(@Body() signupDto : SignupDto){
    return this.authService.signUp(signupDto)
  
  }
}
