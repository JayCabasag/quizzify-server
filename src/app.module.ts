import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { UsersModule } from './users/users.module';
import { AuthGuard } from './auth/auth.guard';
import { APP_GUARD } from '@nestjs/core';
import { ConfigModule } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { TokensModule } from './tokens/tokens.module';
import { RoomsModule } from './rooms/rooms.module';
import { QuizCodeModule } from './quiz-code/quiz-code.module';
import { QuizCodeGuard } from './quiz-code/quiz-code.guard';
import { QuizInvitesModule } from './quiz-invites/quiz-invites.module';

@Module({
  imports: [
    AuthModule,
    UsersModule,
    ConfigModule.forRoot({
      envFilePath: '.env',
      isGlobal: true
    }),
    MongooseModule.forRoot(process.env.DATABASE_URI),
    TokensModule,
    RoomsModule,
    QuizCodeModule,
    QuizInvitesModule
  ],
  controllers: [AppController],
  providers: [
    AppService,
    {
      provide: APP_GUARD,
      useClass: AuthGuard
    },
    {
      provide: APP_GUARD,
      useClass: QuizCodeGuard
    }
  ],
})
export class AppModule { }
