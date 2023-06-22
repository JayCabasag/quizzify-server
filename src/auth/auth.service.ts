import { Injectable, UnauthorizedException, ConflictException, BadRequestException } from '@nestjs/common';
import { UsersService } from 'src/users/users.service';
import { JwtService } from '@nestjs/jwt';
import { UserType } from 'src/users/schemas/user.schema';
import * as bcrypt from 'bcrypt';
import { TokensService } from 'src/tokens/tokens.service';
import { jwtConstants } from './constants';

@Injectable()
export class AuthService {
    constructor(
        private userService: UsersService,
        private jwtService: JwtService,
        private tokenService: TokensService
    ) { }

    async signIn(email: string, pass: string, type: string): Promise<any> {
        const user = await this.userService.findOne(email, type);

        if (!user) {
            throw new UnauthorizedException('Invalid credentials');
        }

        const isPasswordMatch = await this.isMatch(pass, user?.password)

        if (!isPasswordMatch) {
            throw new UnauthorizedException('Invalid credentials');
        }


        const userObjectId = user['_id'];
        const userId = userObjectId.toString();

        const payload = { id: userId, sub: user.email, type: user.type }

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

        if (!this.isUserTypeValid(type)) {
            throw new BadRequestException(`Invalid type: Choose ${Object.values(UserType).join(' or ')}.`)
        }

        if (!this.isPasswordAcceptable(password)) {
            throw new BadRequestException('Minimum password length: 8 characters.')
        }

        const isUserExists = await this.userService.isUserExists(email.toLowerCase(), type)

        if (isUserExists) {
            throw new ConflictException('User already exists')
        }

        const hashPassword = await this.generateHashPassword(password)

        const createdUser = await this.userService.create(email, fullname, hashPassword, type)

        const userObjectId = createdUser['_id']
        const userId = userObjectId.toString()
        const payload = { id: userId, sub: createdUser.email, type: createdUser.type }

        return {
            access_token: await this.jwtService.signAsync(payload)
        }
    }

    async getUser(request: Request & { user: Record<string, any> }): Promise<any> {
        const { id } = request.user
        return await this.userService.findById(id)
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

    isUserTypeValid(type: UserType): boolean {
        const isValid = Object.values(UserType).includes(type)
        return isValid
    }

    isPasswordAcceptable(password: string): boolean {
        const isSecured = password.length > 7
        return isSecured
    }

    extractAuthorizationToken(authorization: string): string | undefined {
        const [type, token] = authorization.split(' ')
        return type === 'Bearer' ? token : undefined
    }
}
