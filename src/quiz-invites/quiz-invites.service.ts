import { Injectable } from '@nestjs/common';
import { CreateQuizInviteDto } from './dto/create-quiz-invite.dto';
import { UpdateQuizInviteDto } from './dto/update-quiz-invite.dto';

@Injectable()
export class QuizInvitesService {
  create(createQuizInviteDto: CreateQuizInviteDto) {
    return 'This action adds a new quizInvite';
  }

  findAll() {
    return `This action returns all quizInvites`;
  }

  findOne(id: number) {
    return `This action returns a #${id} quizInvite`;
  }

  update(id: number, updateQuizInviteDto: UpdateQuizInviteDto) {
    return `This action updates a #${id} quizInvite`;
  }

  remove(id: number) {
    return `This action removes a #${id} quizInvite`;
  }
}
