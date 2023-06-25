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
    return this.quizCodeModel.find()
  }

  findOne(id: string) {
    return this.quizCodeModel.findById(id)
  }

  update(id: string, updateQuizCodeDto: UpdateQuizCodeDto) {
    return `This action updates a #${id} quizCode`;
  }

  remove(id: string) {
    return this.quizCodeModel.findByIdAndRemove(id)
  }
}
