import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { User, UserType } from './schemas/user.schema';
import * as mongoose from 'mongoose';

@Injectable()
export class UsersService {
    constructor(
        @InjectModel(User.name)
        private userModel: mongoose.Model<User>
    ) { }

    async findOne(email: string): Promise<User | undefined> {
        return await this.userModel.findOne({ email })
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
