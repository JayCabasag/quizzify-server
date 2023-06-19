import {
    CanActivate,
    ExecutionContext,
    Injectable,
    UnauthorizedException,
} from '@nestjs/common'
import { Reflector } from '@nestjs/core';
import { JwtService } from '@nestjs/jwt'
import { jwtConstants } from './constants'
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

        if (!token) {
            throw new UnauthorizedException();
        }

        await this.jwtService.verifyAsync(
            token,
            {
                secret: jwtConstants.secret
            }
        ).then((payload) => {
            request['user'] = payload
        }).catch(async (error) => {
            const isJwtExpired = error.message === 'jwt expired'
            if (isJwtExpired) {
                const decodedToken = await this.jwtService.decode(token) as { id: string, sub: string };
                const userId = decodedToken.id
                const email = decodedToken.sub
                const refreshToken = await this.tokensService.getRefreshToken(userId, token).catch(() => {
                    throw new UnauthorizedException();
                })

                await this.jwtService.verifyAsync(
                    refreshToken,
                    {
                        secret: jwtConstants.secret
                    }
                ).then(async () => {
                    const payload = { id: userId, sub: email }
                    const accessToken = await this.jwtService.signAsync(payload)
                    await this.tokensService.updateAccessToken(userId, refreshToken, accessToken, new Date())
                    request['user'] = payload
                    return true
                }).catch(() => {
                    throw new UnauthorizedException();
                })
            } else
                throw new UnauthorizedException();
        })

        return true
    }

    private extractTokenFromHeader(request: Request): string | undefined {
        const [type, token] = request.headers.authorization?.split(' ') ?? [];
        return type === 'Bearer' ? token : undefined
    }
}