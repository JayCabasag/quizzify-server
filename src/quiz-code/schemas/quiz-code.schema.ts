import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose'
import { Schema as MongooseSchema } from "mongoose";

@Schema({
    timestamps: true
})

export class QuizCode {
    @Prop()
    code: string;

    @Prop()
    title: string

    @Prop({ type: MongooseSchema.Types.ObjectId, ref: 'User' })
    teacher: MongooseSchema.Types.ObjectId;

    @Prop()
    startTime: Date

    @Prop()
    endTime: Date

    @Prop({ type: MongooseSchema.Types.ObjectId, ref: 'User' })
    students: MongooseSchema.Types.ObjectId[]
}

export const QuizCodeSchema = SchemaFactory.createForClass(QuizCode)