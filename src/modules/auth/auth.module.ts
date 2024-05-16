import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserEntity } from '../user/entities/user.entity';
import { otpEntity } from '../user/entities/otp.entity';

@Module({
  imports : [TypeOrmModule.forFeature([UserEntity,otpEntity])],
  controllers: [AuthController],
  providers: [AuthService],
})
export class AuthModule {}