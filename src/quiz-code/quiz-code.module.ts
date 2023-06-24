import { Module } from '@nestjs/common';
import { QuizCodeService } from './quiz-code.service';
import { QuizCodeController } from './quiz-code.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { QuizCodeSchema } from './schemas/quiz-code.schema';
import { JwtModule } from '@nestjs/jwt';
import { jwtConstants } from 'src/auth/constants';


@Module({
  imports: [
    MongooseModule.forFeature([{ name: 'QuizCode', schema: QuizCodeSchema }]),
    JwtModule.register({
      global: true,
      secret: jwtConstants.secret,
      signOptions: { expiresIn: '30d' }
    })
  ],
  controllers: [QuizCodeController],
  providers: [QuizCodeService]
})
export class QuizCodeModule { }
