import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";

export enum UserType {
    TEACHER = 'teacher',
    STUDENT = 'student'
}

@Schema({
    timestamps: true
})

export class User {
    @Prop()
    email: string;

    @Prop()
    fullname: string;

    @Prop()
    password: string;

    @Prop()
    type: UserType;
}

export const UserSchema =
    SchemaFactory.createForClass(User)