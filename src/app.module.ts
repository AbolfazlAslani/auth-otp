import { Module } from '@nestjs/common';
import { CustomConfigModule } from './modules/config/configs.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TypeOrmConfig } from './config/typeorm.config';
import { UserModule } from './modules/user/user.module';
import { AuthModule } from './modules/auth/auth.module';
import { JwtModule } from '@nestjs/jwt';


@Module({
  imports: [CustomConfigModule,
    TypeOrmModule.forRootAsync({
      useClass: TypeOrmConfig,
      inject : [TypeOrmConfig]
    
    }),
    UserModule,
    AuthModule,
    JwtModule
  ],
  controllers: [],
  providers: [TypeOrmConfig],
})
export class AppModule {}
