import { CanActivate, ExecutionContext, Injectable } from "@nestjs/common";
import { Reflector } from "@nestjs/core";
import { ROLES_ALLOWED } from "./quiz-code.decorator";

@Injectable()
export class QuizCodeGuard implements CanActivate {

    constructor(private reflector: Reflector) { }

    async canActivate(context: ExecutionContext): Promise<boolean> {

        const rolesAllowed = this.reflector.getAllAndOverride<boolean>(ROLES_ALLOWED, [
            context.getHandler(),
            context.getClass(),
        ]);

        console.log(rolesAllowed)
        return true
    }
}