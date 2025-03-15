import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { MicroserviceOptions, Transport } from '@nestjs/microservices';

async function bootstrap() {
  const { KAFKA_PORT, KAFKA_GROUP_ID, KAFKA_HOST } = process.env;

  const app = await NestFactory.create(AppModule);

  app.connectMicroservice<MicroserviceOptions>({
    transport: Transport.KAFKA,
    options: {
      client: {
        brokers: [`${KAFKA_HOST}:${KAFKA_PORT}`],
      },
      consumer: {
        groupId: KAFKA_GROUP_ID!,
      },
    },
  });

  await app.startAllMicroservices();
  await app.listen(process.env.PORT ?? 3003, () => {
    console.log('Notifications services is listening');
  });
}

bootstrap().catch((err) => console.log(err));
