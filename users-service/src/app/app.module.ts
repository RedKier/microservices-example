import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from 'src/user/user.module';

const {
  MONGO_DATABASE,
  MONGO_ROOT_USER,
  MONGO_ROOT_PASSWORD,
  MONGO_HOST,
  MONGO_PORT,
} = process.env;

@Module({
  imports: [
    MongooseModule.forRoot(`mongodb://${MONGO_HOST}:${MONGO_PORT}`, {
      auth: {
        username: MONGO_ROOT_USER,
        password: MONGO_ROOT_PASSWORD,
      },
      dbName: MONGO_DATABASE,
    }),
    UserModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
