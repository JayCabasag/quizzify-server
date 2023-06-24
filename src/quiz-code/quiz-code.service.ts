import { Injectable } from '@nestjs/common';
import { CreateQuizCodeDto } from './dto/create-quiz-code.dto';
import { UpdateQuizCodeDto } from './dto/update-quiz-code.dto';
import { InjectModel } from '@nestjs/mongoose';
import { QuizCode } from './schemas/quiz-code.schema';
import * as mongoose from 'mongoose';
@Injectable()
export class QuizCodeService {

  constructor(@InjectModel(QuizCode.name) private quizCodeModel: mongoose.Model<QuizCode>) { }

  create(createQuizCodeDto: CreateQuizCodeDto) {
    return this.quizCodeModel.create(createQuizCodeDto);
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
