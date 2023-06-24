import { ForbiddenException, Injectable } from '@nestjs/common';
import { CreateQuizCodeDto } from './dto/create-quiz-code.dto';
import { UpdateQuizCodeDto } from './dto/update-quiz-code.dto';
import { UserType } from 'src/users/schemas/user.schema';

@Injectable()
export class QuizCodeService {
  create(createQuizCodeDto: CreateQuizCodeDto, request: Request & { user: Record<string, any> }) {
    const type = request.user.type
    if (type !== UserType.TEACHER) {
      throw new ForbiddenException('Only teachers can create quiz code')
    }
    return 'This action adds a new quizCode';
  }

  findAll() {
    return `This action returns all quizCode`;
  }

  findOne(id: number) {
    return `This action returns a #${id} quizCode`;
  }

  update(id: number, updateQuizCodeDto: UpdateQuizCodeDto) {
    return `This action updates a #${id} quizCode`;
  }

  remove(id: number) {
    return `This action removes a #${id} quizCode`;
  }
}
