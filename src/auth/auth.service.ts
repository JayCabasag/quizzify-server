import { Injectable, UnauthorizedException, ConflictException } from '@nestjs/common';
import { UsersService } from 'src/users/users.service';
import { JwtService } from '@nestjs/jwt';
import { UserType } from 'src/users/schemas/user.schema';
import * as bcrypt from 'bcrypt';
import { TokensService } from 'src/tokens/tokens.service';

@Injectable()
export class AuthService {
    constructor(
        private userService: UsersService,
        private jwtService: JwtService,
        private tokenService: TokensService
    ) { }

    async signIn(email: string, pass: string): Promise<any> {
        const user = await this.userService.findOne(email);

        if (!user) {
            throw new UnauthorizedException('Invalid credentials');
        }

        const isPasswordMatch = await this.isMatch(pass, user?.password)

        if (!isPasswordMatch) {
            throw new UnauthorizedException('Invalid credentials');
        }


        const userObjectId = user['_id'];
        const userId = userObjectId.toString();

        const payload = { id: userId, sub: user.email }

        // Generate refresh token with a longer expiration date
        const expiresIn = '30d'; // Set the desired expiration duration, e.g., 30 days
        const refreshToken = await this.jwtService.signAsync(payload, { expiresIn });
        const accessToken = await this.jwtService.signAsync(payload)
        const expirationTime = new Date();
        expirationTime.setDate(expirationTime.getDate() + parseInt(expiresIn));

        await this.tokenService.addToken(userId, refreshToken, accessToken, expirationTime)

        return {
            access_token: accessToken
        }
    }

    async signUp(
        email: string,
        fullname: string,
        password: string,
        type: UserType,
    ): Promise<any> {

        const isUserExists = await this.userService.isUserExists(email, type)

        if (isUserExists) {
            throw new ConflictException('User already exists')
        }

        const hashPassword = await this.generateHashPassword(password)

        const createdUser = await this.userService.create(email, fullname, hashPassword, type)

        const payload = { sub: createdUser.email, type: createdUser.type }

        return {
            access_token: await this.jwtService.signAsync(payload)
        }
    }

    async generateHashPassword(password: string): Promise<string> {
        const saltRounds = 10;
        const salt = await bcrypt.genSalt(saltRounds);
        const hashPassword = await bcrypt.hash(password, salt);
        return hashPassword;
    }

    async isMatch(password: string, hash: string): Promise<boolean> {
        const isMatch = await bcrypt.compare(password, hash);
        return isMatch;
    }
}
