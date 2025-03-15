import { NestFactory } from '@nestjs/core';
import { ValidationPipe } from '@nestjs/common';

import { AppModule } from './app/app.module';
import { MongoExceptionFilter } from './app/filters/mongoException.filter';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.useGlobalFilters(new MongoExceptionFilter());
  app.useGlobalPipes(new ValidationPipe());

  await app.listen(process.env.PORT ?? 3002, () => {
    console.log('Users services is listening');
  });
}

bootstrap().catch((err) => console.log(err));
