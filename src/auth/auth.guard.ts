import {
    CanActivate,
    ExecutionContext,
    Injectable,
    UnauthorizedException
} from '@nestjs/common'
import { Reflector } from '@nestjs/core';
import { JwtService } from '@nestjs/jwt'
import { Request } from 'express'
import { IS_PUBLIC_KEY } from './auth.decorators';
import { jwtConstants } from './constants';

@Injectable()
export class AuthGuard implements CanActivate {
    constructor(private jwtService: JwtService, private reflector: Reflector) { }

    async canActivate(context: ExecutionContext): Promise<boolean> {

        const isPublic = this.reflector.getAllAndOverride<boolean>(IS_PUBLIC_KEY, [
            context.getHandler(),
            context.getClass(),
        ]);

        if (isPublic) {
            return true;
        }

        const request = context.switchToHttp().getRequest();
        const token = this.extractTokenFromHeader(request);
        const isValidToken = await this.isValidToken(token)

        if (!token) {
            throw new UnauthorizedException('Invalid token');
        }

        if (!isValidToken) {
            throw new UnauthorizedException('Invalid token');
        }

        return true
    }

    private extractTokenFromHeader(request: Request): string | undefined {
        const [type, token] = request.headers.authorization?.split(' ') ?? [];
        return type === 'Bearer' ? token : undefined
    }

    private async isValidToken(token: string): Promise<boolean> {

        let isValidToken = true

        await this.jwtService.verifyAsync(token, { secret: jwtConstants.secret })
            .then(() => {
                isValidToken = true
            })
            .catch(() => {
                isValidToken = false
            })

        return isValidToken
    }
}