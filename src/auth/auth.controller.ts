import {
    Controller,
    HttpStatus,
    Request,
    Get,
    HttpCode,
    Post,
    Body
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
        return this.authService.signIn(signInDto.email, signInDto.password);
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
