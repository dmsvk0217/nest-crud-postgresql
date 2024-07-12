import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { HttpExceptionFilter } from './exception/http-exception.filter';
import { Logger } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const port = 3000;
  app.useGlobalFilters(new HttpExceptionFilter());
  Logger.log(`Application running on port ${port}`);
  await app.listen(port);
}

bootstrap();
