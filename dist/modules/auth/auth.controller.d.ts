import { AuthService } from './auth.service';
import { CheckOtpDto, SendOtpDto } from './dto/auth.dto';
export declare class AuthController {
    private readonly authService;
    constructor(authService: AuthService);
    sendOtp(otpDto: SendOtpDto): Promise<{
        message: string;
    }>;
    checkOtp(checkOtpDto: CheckOtpDto): Promise<{
        message: string;
    }>;
}
