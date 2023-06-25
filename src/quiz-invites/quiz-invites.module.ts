import { Module } from '@nestjs/common';
import { QuizInvitesService } from './quiz-invites.service';
import { QuizInvitesController } from './quiz-invites.controller';

@Module({
  controllers: [QuizInvitesController],
  providers: [QuizInvitesService]
})
export class QuizInvitesModule {}
