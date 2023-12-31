import { Controller, Get, Param } from '@nestjs/common';
import { UsersService } from './users.service';

@Controller('users')
export class UsersController {

    constructor(private userService: UsersService) { }

    @Get(':id')
    getUser(@Param('id') id: string) {
        return this.userService.findById(id)
    }
}
