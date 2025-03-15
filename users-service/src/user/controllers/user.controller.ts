import {
  Body,
  Controller,
  Delete,
  Get,
  HttpStatus,
  Inject,
  NotFoundException,
  Param,
  Patch,
  Post,
  Res,
} from '@nestjs/common';
import { UserService } from '../services/user.service';
import { CreateUserDTO } from '../dtos/createUser.dto';
import { User } from '../schemas/user.schemat';
import { Response } from 'express';
import { UpdateUserDTO } from '../dtos/updateUser.dto';
import { ClientKafka } from '@nestjs/microservices';

@Controller('users')
export class UserController {
  constructor(
    @Inject()
    private readonly userService: UserService,
    @Inject('NOTIFICATIONS_SERVICE')
    private readonly notificationsClient: ClientKafka,
  ) {}

  @Post()
  async create(
    @Body() payload: CreateUserDTO,
    @Res() response: Response,
  ): Promise<Response<User>> {
    const user = await this.userService.create(payload);

    this.notificationsClient.emit('user_created', { ...user });

    return response.status(HttpStatus.CREATED).json({ user });
  }

  @Get()
  async fetchMany(@Res() response: Response): Promise<Response<User[]>> {
    const users = await this.userService.findAll();

    return response.status(HttpStatus.OK).json({ data: users });
  }

  @Patch('/:id')
  async update(
    @Param('id') userId: string,
    @Body() payload: UpdateUserDTO,
    @Res() response: Response,
  ): Promise<Response<User>> {
    const user = await this.userService.updateOneById(userId, payload);

    if (!user) {
      throw new NotFoundException(`User ${userId} not found`);
    }

    return response.status(HttpStatus.OK).json({ user });
  }

  @Delete('/:id')
  async delete(
    @Param('id') userId: string,
    @Res() response: Response,
  ): Promise<Response<User>> {
    const user = await this.userService.deleteOneById(userId);

    if (!user) {
      throw new NotFoundException(`User ${userId} not found`);
    }

    this.notificationsClient.emit('user_deleted', { ...user });

    return response.status(HttpStatus.NO_CONTENT).json();
  }
}
