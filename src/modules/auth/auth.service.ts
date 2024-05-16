import { BadRequestException, Inject, Injectable } from '@nestjs/common';
import { UserEntity } from '../user/entities/user.entity';
import { Code, Repository } from 'typeorm';
import { otpEntity } from '../user/entities/otp.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { randomInt } from 'crypto';
import { SendOtpDto } from './dto/auth.dto';

@Injectable()
export class AuthService { 
    constructor(
      @InjectRepository(UserEntity)
      private userRepository : Repository<UserEntity> ,
      
      @InjectRepository(otpEntity) private otpRepository : Repository<otpEntity>   

    ){}
    
    
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

}
