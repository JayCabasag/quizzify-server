import { Controller, Get, Request } from '@nestjs/common';
import { TokensService } from './tokens.service';
import { Request as ExpressRequest } from 'express';

@Controller('tokens')
export class TokensController {

    constructor(private tokenService: TokensService) { }

    @Get('verify')
    verifyToken(@Request() request: ExpressRequest & { token: string, user: Record<string, any> }) {
        return this.tokenService.verifyToken(request)
    }
}
