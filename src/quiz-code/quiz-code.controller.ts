import { Controller, Get, Post, Body, Patch, Param, Delete, Request } from '@nestjs/common';
import { QuizCodeService } from './quiz-code.service';
import { CreateQuizCodeDto } from './dto/create-quiz-code.dto';
import { UpdateQuizCodeDto } from './dto/update-quiz-code.dto';
import { RolesAllowed } from './quiz-code.decorator';
import { UserType } from 'src/users/schemas/user.schema';

@Controller('quiz-code')
export class QuizCodeController {
  constructor(private readonly quizCodeService: QuizCodeService) { }

  @RolesAllowed(UserType.TEACHER)
  @Post('new')
  create(@Body() createQuizCodeDto: CreateQuizCodeDto) {
    return this.quizCodeService.create(createQuizCodeDto);
  }

  @Get()
  findAll() {
    return this.quizCodeService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.quizCodeService.findOne(id);
  }

  @RolesAllowed(UserType.TEACHER)
  @Patch(':id')
  update(@Param('id') id: string, @Body() updateQuizCodeDto: UpdateQuizCodeDto) {
    return this.quizCodeService.update(id, updateQuizCodeDto);
  }

  @RolesAllowed(UserType.TEACHER)
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.quizCodeService.remove(id);
  }


}
