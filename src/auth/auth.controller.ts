import {
    Controller,
    HttpStatus,
    HttpCode,
    Post,
    Body,
    Request,
    Get
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { Public } from './auth.decorators';

@Controller('auth')
export class AuthController {
    constructor(private authService: AuthService) { }

    @Public()
    @HttpCode(HttpStatus.OK)
    @Post('signin')
    signIn(@Body() signInDto: Record<string, any>) {
        return this.authService.signIn(signInDto.email, signInDto.password, signInDto.type);
    }

    @HttpCode(HttpStatus.OK)
    @Get('user')
    user(@Request() request: Request & { user: Record<string, any> }) {
        return this.authService.getUser(request)
    }

    @Public()
    @HttpCode(HttpStatus.OK)
    @Post('signup')
    signUp(@Body() signUpDto: Record<string, any>) {
        return this.authService.signUp(
            signUpDto.email,
            signUpDto.fullname,
            signUpDto.password,
            signUpDto.type
        );
    }
}
