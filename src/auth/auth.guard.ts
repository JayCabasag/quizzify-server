import {
    CanActivate,
    ExecutionContext,
    Injectable,
    UnauthorizedException,
} from '@nestjs/common'
import { Reflector } from '@nestjs/core';
import { JwtService } from '@nestjs/jwt'
import { DecodedToken, jwtConstants } from './constants'
import { Request } from 'express'
import { IS_PUBLIC_KEY } from './auth.decorators';
import { TokensService } from 'src/tokens/tokens.service';

@Injectable()
export class AuthGuard implements CanActivate {
    constructor(private jwtService: JwtService, private reflector: Reflector, private tokensService: TokensService) { }

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
        const isTokenExpired = await this.isTokenExpired(token)

        if (!token) {
            throw new UnauthorizedException();
        }

        if (isTokenExpired) {
            throw new UnauthorizedException();
        }

        return true
    }

    private extractTokenFromHeader(request: Request): string | undefined {
        const [type, token] = request.headers.authorization?.split(' ') ?? [];
        return type === 'Bearer' ? token : undefined
    }

    private async isTokenExpired(token: string): Promise<boolean> {

        let isTokenExpired = false

        await this.jwtService.verifyAsync(token, { secret: jwtConstants.secret })
            .then(() => {
                isTokenExpired = false
            })
            .catch(() => {
                isTokenExpired = true
            })

        return isTokenExpired
    }
}