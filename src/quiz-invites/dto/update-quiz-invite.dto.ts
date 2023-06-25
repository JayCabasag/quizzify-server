import { PartialType } from '@nestjs/mapped-types';
import { CreateQuizInviteDto } from './create-quiz-invite.dto';

export class UpdateQuizInviteDto extends PartialType(CreateQuizInviteDto) {}
