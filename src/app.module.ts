import { Module } from '@nestjs/common';
import { CustomConfigModule } from './modules/config/configs.module';


@Module({
  imports: [CustomConfigModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
