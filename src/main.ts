import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ConfigService } from '@nestjs/config';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(new ValidationPipe())
  const ConfigsService = app.get(ConfigService);
  
  const port = ConfigsService.get('App.port')
  await app.listen(port,()=>{
    console.log(`http://localhost:${port}`);
    
  
  });
}
bootstrap();
