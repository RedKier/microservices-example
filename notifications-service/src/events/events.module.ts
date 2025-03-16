import { Module } from '@nestjs/common';

import { EventsController } from '../events/services/events.controller';

@Module({
  controllers: [EventsController],
})
export class EventsModule {}
