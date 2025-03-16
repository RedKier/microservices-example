import { NestFactory } from '@nestjs/core';
import { AppModule } from './app/app.module';
import { MicroserviceOptions, Transport } from '@nestjs/microservices';
import { ConfigService } from '@nestjs/config';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  const configService = app.get(ConfigService);
  const port = configService.get<number>('server.port')!;

  const kafkaPort = configService.get<number>('kafka.port')!;
  const kafkaHost = configService.get<string>('kafka.host')!;
  const kafkaGroupId = configService.get<string>('kafka.groupId')!;

  app.connectMicroservice<MicroserviceOptions>({
    transport: Transport.KAFKA,
    options: {
      client: {
        brokers: [`${kafkaHost}:${kafkaPort}`],
      },
      consumer: {
        groupId: kafkaGroupId,
      },
    },
  });

  await app.startAllMicroservices();
  await app.listen(port, () => {
    console.log('Notifications services is listening');
  });
}

bootstrap().catch((err) => console.log(err));
