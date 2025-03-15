import { Injectable, NotFoundException } from '@nestjs/common';
import { User } from '../schemas/user.schemat';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

interface CreatePayload {
  name: string;
  email: string;
}

interface UpdatePayload {
  name?: string;
  email?: string;
}

@Injectable()
export class UserService {
  constructor(@InjectModel(User.name) private userModel: Model<User>) {}

  async create(payload: CreatePayload): Promise<User> {
    const createdUser = new this.userModel(payload);

    return createdUser.save();
  }

  async findAll(): Promise<User[]> {
    return this.userModel.find().exec();
  }

  async updateOneById(
    id: string,
    payload: UpdatePayload,
  ): Promise<User | null> {
    const updatedUser = await this.userModel.findByIdAndUpdate(id, payload, {
      new: true,
    });

    return updatedUser;
  }

  async deleteOneById(id: string): Promise<User | null> {
    const deletedUser = await this.userModel.findByIdAndDelete(id);

    return deletedUser;
  }
}
