import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Token } from './schemas/token.schema';
import mongoose from 'mongoose';

@Injectable()
export class TokensService {
    constructor(
        @InjectModel(Token.name)
        private tokenModel: mongoose.Model<Token>
    ) { }

    async addToken(userId: string, refreshToken: string, accessToken: string, expirationTime: Date): Promise<Token> {
        return await this.tokenModel.create({ userId, refreshToken, accessToken, isRevoked: false, expirationTime })
    }

    async updateAccessToken(userId: string, refreshToken: string, accessToken: string, expirationTime: Date): Promise<string> {
        const updatedToken = await this.tokenModel.findOneAndUpdate(
            { userId, refreshToken },
            { accessToken, expirationTime },
            { new: true }
        )
        return updatedToken.accessToken
    }

    async getRefreshToken(userId: string, accessToken: string): Promise<string> {
        const tokenData = await this.tokenModel.findOne({ userId, accessToken })
        return tokenData.refreshToken
    }

    async revokeToken(userId: string, refreshToken: string): Promise<Token> {
        return await this.tokenModel.findOneAndUpdate({ userId, refreshToken }, { isRevoked: true }, { new: true })
    }

}
