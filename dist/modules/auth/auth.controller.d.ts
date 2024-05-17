import { AuthService } from './auth.service';
import { CheckOtpDto, SendOtpDto } from './dto/auth.dto';
import { SignupDto } from './dto/basic.dto';
export declare class AuthController {
    private readonly authService;
    constructor(authService: AuthService);
    sendOtp(otpDto: SendOtpDto): Promise<{
        message: string;
    }>;
    checkOtp(checkOtpDto: CheckOtpDto): Promise<{
        accessToken: string;
        refreshToken: string;
        message: string;
    }>;
    signup(signupDto: SignupDto): Promise<{
        message: string;
    }>;
}
