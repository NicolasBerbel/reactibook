import { config as configEnv } from 'dotenv';
process.env.NODE_ENV = process.env.NODE_ENV || 'development';
configEnv({ path: `../environments/${process.env.NODE_ENV}.env`});

import { NestFactory } from '@nestjs/core';
import { AppModule } from './app';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  await app.listen(process.env.PORT || 3001);
}
bootstrap();
