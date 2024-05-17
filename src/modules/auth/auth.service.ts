import { BadRequestException, Inject, Injectable, UnauthorizedException } from '@nestjs/common';
import { UserEntity } from '../user/entities/user.entity';
import { Code, Repository } from 'typeorm';
import { otpEntity } from '../user/entities/otp.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { randomInt } from 'crypto';
import { CheckOtpDto, SendOtpDto } from './dto/auth.dto';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
import { TTokenPayload } from './types/payload';

@Injectable()
export class AuthService { 
    constructor(
      @InjectRepository(UserEntity)
      private userRepository : Repository<UserEntity> ,
      @InjectRepository(otpEntity)
      private otpRepository : Repository<otpEntity>,
      private jwtService : JwtService,
      private configService : ConfigService

    ){}
    
    async checkOtp(otpDto: CheckOtpDto){
        const {mobile, code} = otpDto;
        const now = new Date();
        const user = await this.userRepository.findOne({
        
        where : {mobile},
        relations : {
            otp: true
        }
        
        });
        if (!user || !user?.otp) throw new UnauthorizedException("Account Not Found!");
        const otp = user?.otp 
        if (otp?.code !== code) throw new UnauthorizedException("Code is incorrect");
        if (otp.expires_in < now) throw new UnauthorizedException("otp code is expired")
        if(!user.mobile_verify){
            await this.userRepository.update(
                {id:user.id},
                {
                    mobile_verify:true
                }
            )
        
        }

        const {accessToken, refreshToken} = await this.createTokenForUser({id: user.id, mobile})
        
        return {
            accessToken,
            refreshToken,
            message:"You Logged in Successfully!"
        }    

    }
    
    
    async sendOtp(otpDto : SendOtpDto){
        const {mobile} = otpDto;
        
        let user = await this.userRepository.findOneBy({mobile});
        if (!user){
            user = await this.userRepository.create({
                mobile       
            
            })
            await this.userRepository.save(user)
        }
        await this.createOtpForUser(user);
        return {
            message : "sent code successfully!"
        }
    
    }
    
    async createOtpForUser(user : UserEntity){
        const expiresIn = new Date(new Date().getTime() + 1000*60*2);
        const code = randomInt(10000,99999).toString();
        
        
        let otp = await this.otpRepository.findOneBy({userId : user.id})

        if(otp){
            if (otp.expires_in > new Date()){
            
                throw new BadRequestException("Otp No Expired!")
            }

            otp.code =  code;
            otp.expires_in = expiresIn
        }else {
            otp = this.otpRepository.create({
                code, 
                expires_in : expiresIn,
                userId : user.id
            
            })
        
        }
        
        otp = await this.otpRepository.save(otp);
        user.otpId = otp.id;
        await this.userRepository.save(user);
    }
    async createTokenForUser(payload: TTokenPayload){
        const accessToken = this.jwtService.sign(payload,{
            secret : this.configService.get("Jwt.accessTokenSecret"),
            expiresIn : "30d"
        })
        const refreshToken = this.jwtService.sign(payload,{
            secret : this.configService.get("Jwt.refreshTokenSecret"),
            expiresIn:"1y"
        })
        return { 
            accessToken,
            refreshToken
        }
    }

}
