import { Module } from '@nestjs/common';
import { QuizCodeService } from './quiz-code.service';
import { QuizCodeController } from './quiz-code.controller';

@Module({
  controllers: [QuizCodeController],
  providers: [QuizCodeService]
})
export class QuizCodeModule {}
