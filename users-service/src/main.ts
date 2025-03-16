import { NestFactory } from '@nestjs/core';
import { ValidationPipe } from '@nestjs/common';

import { AppModule } from './app/app.module';
import { MongoExceptionFilter } from './app/filters/mongoException.filter';
import { ConfigService } from '@nestjs/config';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  const configService = app.get(ConfigService);
  const port = configService.get<number>('server.port')!;

  app.useGlobalFilters(new MongoExceptionFilter());
  app.useGlobalPipes(
    new ValidationPipe({
      transform: true,
      whitelist: true,
      forbidNonWhitelisted: true,
    }),
  );

  await app.listen(port, () => {
    console.log('Users services is listening');
  });
}

bootstrap().catch((err) => console.log(err));
