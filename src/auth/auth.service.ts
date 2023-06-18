import { Injectable, UnauthorizedException, ConflictException } from '@nestjs/common';
import { UsersService } from 'src/users/users.service';
import { JwtService } from '@nestjs/jwt';
import { UserType } from 'src/users/schemas/user.schema';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService {
    constructor(
        private userService: UsersService,
        private jwtService: JwtService
    ) { }

    async signIn(email: string, pass: string): Promise<any> {
        const user = await this.userService.findOne(email);

        if (!user) {
            throw new UnauthorizedException('User does not exists');
        }

        const isPasswordMatch = await this.isMatch(pass, user?.password)

        if (!isPasswordMatch) {
            throw new UnauthorizedException('Credentials incorrect');
        }
        const payload = { sub: user.email }

        return {
            access_token: await this.jwtService.signAsync(payload)
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
