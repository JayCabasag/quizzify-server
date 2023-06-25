import { PartialType } from '@nestjs/mapped-types';
import { CreateQuizCodeDto } from './create-quiz-code.dto';

export class UpdateQuizCodeDto extends PartialType(CreateQuizCodeDto) { }
