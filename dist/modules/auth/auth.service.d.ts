import { UserEntity } from '../user/entities/user.entity';
import { Repository } from 'typeorm';
import { otpEntity } from '../user/entities/otp.entity';
import { CheckOtpDto, SendOtpDto } from './dto/auth.dto';
export declare class AuthService {
    private userRepository;
    private otpRepository;
    constructor(userRepository: Repository<UserEntity>, otpRepository: Repository<otpEntity>);
    checkOtp(otpDto: CheckOtpDto): Promise<{
        message: string;
    }>;
    sendOtp(otpDto: SendOtpDto): Promise<{
        message: string;
    }>;
    createOtpForUser(user: UserEntity): Promise<void>;
}
