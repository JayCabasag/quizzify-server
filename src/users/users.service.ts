import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { User, UserType } from './schemas/user.schema';
import * as mongoose from 'mongoose';

@Injectable()
export class UsersService {
    constructor(
        @InjectModel(User.name)
        private userModel: mongoose.Model<User>
    ) { }

    async findById(id: string): Promise<User> {
        const projection = { password: 0 }; // Exclude the 'password' field
        try {
            return await this.userModel.findById(id, projection)
        } catch (error) {
            throw new NotFoundException('User not found')
        }
    }

    async findOne(email: string, type: string): Promise<User | undefined> {
        return await this.userModel.findOne({ email, type })
    }

    async isUserExists(
        email: string,
        type: UserType,
    ): Promise<boolean> {
        const user = await this.userModel.findOne({ email, type })
        return !!user;
    }

    async create(
        email: string,
        fullname: string,
        password: string,
        type: UserType,
    ): Promise<User | undefined> {
        return this.userModel.create({ email, fullname, password, type })
    }

}
