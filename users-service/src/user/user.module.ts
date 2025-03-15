import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { User, UserSchema } from './schemas/user.schemat';
import { UserService } from './services/user.service';
import { UserController } from './controllers/user.controller';
import { ClientsModule, Transport } from '@nestjs/microservices';

const {
  KAFKA_PORT,
  KAFKA_GROUP_ID,
  KAFKA_HOST,
  KAFKA_CLIENT_ID,
  KAFKA_SERVICE,
} = process.env;

@Module({
  imports: [
    ClientsModule.register([
      {
        name: KAFKA_SERVICE!,
        transport: Transport.KAFKA,
        options: {
          client: {
            clientId: KAFKA_CLIENT_ID!,
            brokers: [`${KAFKA_HOST}:${KAFKA_PORT}`],
          },
          consumer: {
            groupId: KAFKA_GROUP_ID!,
          },
        },
      },
    ]),
    MongooseModule.forFeature([{ name: User.name, schema: UserSchema }]),
  ],
  controllers: [UserController],
  providers: [UserService],
})
export class UserModule {}
