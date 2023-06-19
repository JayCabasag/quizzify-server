import { Module } from '@nestjs/common';
import { TokensService } from './tokens.service';
import { TokensController } from './tokens.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { TokenSchema } from './schemas/token.schema';

@Module({
  imports: [MongooseModule.forFeature([{ name: 'Token', schema: TokenSchema }])],
  providers: [TokensService],
  controllers: [TokensController],
  exports: [TokensService]
})
export class TokensModule { }
