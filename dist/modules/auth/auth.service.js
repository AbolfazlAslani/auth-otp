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
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthService = void 0;
const common_1 = require("@nestjs/common");
const user_entity_1 = require("../user/entities/user.entity");
const typeorm_1 = require("typeorm");
const otp_entity_1 = require("../user/entities/otp.entity");
const typeorm_2 = require("@nestjs/typeorm");
const crypto_1 = require("crypto");
const jwt_1 = require("@nestjs/jwt");
const config_1 = require("@nestjs/config");
const bcrypt_1 = require("bcrypt");
let AuthService = class AuthService {
    constructor(userRepository, otpRepository, jwtService, configService) {
        this.userRepository = userRepository;
        this.otpRepository = otpRepository;
        this.jwtService = jwtService;
        this.configService = configService;
    }
    async checkOtp(otpDto) {
        const { mobile, code } = otpDto;
        const now = new Date();
        const user = await this.userRepository.findOne({
            where: { mobile },
            relations: {
                otp: true
            }
        });
        if (!user || !user?.otp)
            throw new common_1.UnauthorizedException("Account Not Found!");
        const otp = user?.otp;
        if (otp?.code !== code)
            throw new common_1.UnauthorizedException("Code is incorrect");
        if (otp.expires_in < now)
            throw new common_1.UnauthorizedException("otp code is expired");
        if (!user.mobile_verify) {
            await this.userRepository.update({ id: user.id }, {
                mobile_verify: true
            });
        }
        const { accessToken, refreshToken } = await this.createTokenForUser({ id: user.id, mobile });
        return {
            accessToken,
            refreshToken,
            message: "You Logged in Successfully!"
        };
    }
    async signUp(signupDto) {
        const { confirm_password, email, first_name, last_name, mobile, password } = signupDto;
        await this.checkEmail(email);
        await this.checkMobile(mobile);
        if (password !== confirm_password)
            throw new common_1.BadRequestException("Password and confirm password do not match");
        const salt = (0, bcrypt_1.genSaltSync)(10);
        const hashedPassword = (0, bcrypt_1.hashSync)(password, salt);
        const user = this.userRepository.create({
            first_name,
            last_name,
            mobile,
            password: hashedPassword,
            email,
            mobile_verify: false
        });
        await this.userRepository.save(user);
        return {
            message: "user signup successful!"
        };
    }
    async checkEmail(email) {
        const result = await this.userRepository.findOneBy({ email });
        if (result)
            throw new common_1.ConflictException("Email Already Exists!");
    }
    async checkMobile(mobile) {
        const result = await this.userRepository.findOneBy({ mobile });
        if (result)
            throw new common_1.ConflictException("Mobile Already Exists!");
    }
    async sendOtp(otpDto) {
        const { mobile } = otpDto;
        let user = await this.userRepository.findOneBy({ mobile });
        if (!user) {
            user = await this.userRepository.create({
                mobile
            });
            await this.userRepository.save(user);
        }
        await this.createOtpForUser(user);
        return {
            message: "sent code successfully!"
        };
    }
    async createOtpForUser(user) {
        const expiresIn = new Date(new Date().getTime() + 1000 * 60 * 2);
        const code = (0, crypto_1.randomInt)(10000, 99999).toString();
        let otp = await this.otpRepository.findOneBy({ userId: user.id });
        if (otp) {
            if (otp.expires_in > new Date()) {
                throw new common_1.BadRequestException("Otp No Expired!");
            }
            otp.code = code;
            otp.expires_in = expiresIn;
        }
        else {
            otp = this.otpRepository.create({
                code,
                expires_in: expiresIn,
                userId: user.id
            });
        }
        otp = await this.otpRepository.save(otp);
        user.otpId = otp.id;
        await this.userRepository.save(user);
    }
    async createTokenForUser(payload) {
        const accessToken = this.jwtService.sign(payload, {
            secret: this.configService.get("Jwt.accessTokenSecret"),
            expiresIn: "30d"
        });
        const refreshToken = this.jwtService.sign(payload, {
            secret: this.configService.get("Jwt.refreshTokenSecret"),
            expiresIn: "1y"
        });
        return {
            accessToken,
            refreshToken
        };
    }
    async validateAccessToken(token) {
        try {
            const payload = this.jwtService.verify(token, {
                secret: this.configService.get("Jwt.accessTokenSecret")
            });
            if (typeof payload == "object" && payload?.id) {
                const user = await this.userRepository.findOneBy({ id: payload.id });
                if (!user) {
                    throw new common_1.UnauthorizedException("Please login to your account");
                }
                return user;
            }
            throw new common_1.UnauthorizedException("Please login to your account");
        }
        catch (error) {
            throw new common_1.UnauthorizedException("Please login to your account");
        }
    }
};
exports.AuthService = AuthService;
exports.AuthService = AuthService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_2.InjectRepository)(user_entity_1.UserEntity)),
    __param(1, (0, typeorm_2.InjectRepository)(otp_entity_1.otpEntity)),
    __metadata("design:paramtypes", [typeorm_1.Repository,
        typeorm_1.Repository,
        jwt_1.JwtService,
        config_1.ConfigService])
], AuthService);
//# sourceMappingURL=auth.service.js.map