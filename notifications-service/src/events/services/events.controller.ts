import { Controller } from '@nestjs/common';
import { EventPattern, Payload } from '@nestjs/microservices';

@Controller()
export class EventsController {
  @EventPattern('user_created')
  handleUserCreated(@Payload() data: any) {
    console.log('User created', data);
  }

  @EventPattern('user_deleted')
  handleUserDeleted(@Payload() data: any) {
    console.log('User deleted', data);
  }
}
