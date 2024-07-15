import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { HttpExceptionFilter } from './exception/http-exception.filter';
import { Logger } from '@nestjs/common';
import { AllExceptionsFilter } from './exception/all-exception.filter';
import * as config from 'config';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalFilters(new AllExceptionsFilter());
  app.useGlobalFilters(new HttpExceptionFilter());

  const serverConfig = config.get('server');
  const port = serverConfig.port;
  Logger.log(`Application running on port ${port}`);

  await app.listen(port);
}

bootstrap();
