import { CanActivate, ExecutionContext, ForbiddenException, Injectable } from "@nestjs/common";
import { Reflector } from "@nestjs/core";
import { ROLES_ALLOWED } from "./quiz-code.decorator";
import { Request } from "express";
import { JwtService } from "@nestjs/jwt";

@Injectable()
export class QuizCodeGuard implements CanActivate {

    constructor(private reflector: Reflector, private jwtService: JwtService) { }

    async canActivate(context: ExecutionContext): Promise<boolean> {

        const rolesAllowed = this.reflector.getAllAndOverride<string[]>(ROLES_ALLOWED, [
            context.getHandler(),
            context.getClass(),
        ]);

        if (!rolesAllowed) {
            return true
        }

        const request = context.switchToHttp().getRequest();
        const token = this.extractTokenFromHeader(request);

        const decodedToken = await this.decodeToken(token)
        const userType = decodedToken.type

        const isRoleAllowed = Boolean(rolesAllowed.find((type) => type === userType))

        if (!isRoleAllowed) {
            throw new ForbiddenException('Role-based access denied.')
        }

        return true
    }

    extractTokenFromHeader(request: Request): string | undefined {
        const [type, token] = request.headers.authorization?.split(' ')
        return type === 'Bearer' ? token : undefined
    }

    private async decodeToken(token) {
        const decodeToken = await this.jwtService.decode(token) as Record<string, any>
        return decodeToken
    }

}