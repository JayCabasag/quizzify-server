import { Controller, Get, Post, Body, Patch, Param, Delete, Request } from '@nestjs/common';
import { QuizCodeService } from './quiz-code.service';
import { CreateQuizCodeDto } from './dto/create-quiz-code.dto';
import { UpdateQuizCodeDto } from './dto/update-quiz-code.dto';
import { RolesAllowed } from './quiz-code.decorator';

@Controller('quiz-code')
export class QuizCodeController {
  constructor(private readonly quizCodeService: QuizCodeService) { }

  @Post()
  @RolesAllowed()
  create(@Body() createQuizCodeDto: CreateQuizCodeDto, @Request() request: Request & { user: Record<string, any> }) {
    return this.quizCodeService.create(createQuizCodeDto, request);
  }

  @Get()
  findAll() {
    return this.quizCodeService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.quizCodeService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateQuizCodeDto: UpdateQuizCodeDto) {
    return this.quizCodeService.update(+id, updateQuizCodeDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.quizCodeService.remove(+id);
  }
}
