import { UserEntity } from '../user/entities/user.entity';
import { Repository } from 'typeorm';
import { otpEntity } from '../user/entities/otp.entity';
import { CheckOtpDto, SendOtpDto } from './dto/auth.dto';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
import { TTokenPayload } from './types/payload';
export declare class AuthService {
    private userRepository;
    private otpRepository;
    private jwtService;
    private configService;
    constructor(userRepository: Repository<UserEntity>, otpRepository: Repository<otpEntity>, jwtService: JwtService, configService: ConfigService);
    checkOtp(otpDto: CheckOtpDto): Promise<{
        accessToken: string;
        refreshToken: string;
        message: string;
    }>;
    sendOtp(otpDto: SendOtpDto): Promise<{
        message: string;
    }>;
    createOtpForUser(user: UserEntity): Promise<void>;
    createTokenForUser(payload: TTokenPayload): Promise<{
        accessToken: string;
        refreshToken: string;
    }>;
    validateAccessToken(token: string): Promise<UserEntity>;
}
