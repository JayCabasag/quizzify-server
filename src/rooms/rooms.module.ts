import { Module } from '@nestjs/common';
import { RoomsController } from './rooms.controller';
import { RoomsService } from './rooms.service';
import { RoomSchema } from './schemas/room.schema';
import { MongooseModule } from '@nestjs/mongoose';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: 'Room', schema: RoomSchema }])
  ],
  controllers: [RoomsController],
  providers: [RoomsService]
})
export class RoomsModule { }
