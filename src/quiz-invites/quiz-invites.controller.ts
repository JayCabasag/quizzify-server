import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { QuizInvitesService } from './quiz-invites.service';
import { CreateQuizInviteDto } from './dto/create-quiz-invite.dto';
import { UpdateQuizInviteDto } from './dto/update-quiz-invite.dto';

@Controller('quiz-invites')
export class QuizInvitesController {
  constructor(private readonly quizInvitesService: QuizInvitesService) {}

  @Post()
  create(@Body() createQuizInviteDto: CreateQuizInviteDto) {
    return this.quizInvitesService.create(createQuizInviteDto);
  }

  @Get()
  findAll() {
    return this.quizInvitesService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.quizInvitesService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateQuizInviteDto: UpdateQuizInviteDto) {
    return this.quizInvitesService.update(+id, updateQuizInviteDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.quizInvitesService.remove(+id);
  }
}
