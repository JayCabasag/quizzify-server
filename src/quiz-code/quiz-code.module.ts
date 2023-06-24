import { Module } from '@nestjs/common';
import { QuizCodeService } from './quiz-code.service';
import { QuizCodeController } from './quiz-code.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { QuizCodeSchema } from './schemas/quiz-code.schema';


@Module({
  imports: [
    MongooseModule.forFeature([{ name: 'QuizCode', schema: QuizCodeSchema }])
  ],
  controllers: [QuizCodeController],
  providers: [QuizCodeService]
})
export class QuizCodeModule { }
