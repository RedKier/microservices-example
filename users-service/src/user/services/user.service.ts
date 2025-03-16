import { Injectable } from '@nestjs/common';
import { User } from '../schemas/user.schemat';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

interface CreatePayload {
  name: string;
  email: string;
}

interface FindAllPayload {
  page: number;
  limit: number;
}

interface FindAllResults {
  data: User[];
  meta: {
    total: number;
    page: number;
    limit: number;
    totalPages: number;
  };
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

  async findAll(payload: FindAllPayload): Promise<FindAllResults> {
    const { page, limit } = payload;

    const skip = (page - 1) * limit;

    const data = await this.userModel.find().skip(skip).limit(limit).exec();

    const total = await this.userModel.countDocuments();

    const totalPages = Math.ceil(total / limit);

    return {
      data,
      meta: {
        total,
        page,
        limit,
        totalPages,
      },
    };
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
