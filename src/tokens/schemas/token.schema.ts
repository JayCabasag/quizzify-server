import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";


@Schema({
    timestamps: true
})

export class Token {
    @Prop()
    userId: string;

    @Prop()
    refreshToken: string;

    @Prop()
    accessToken: string;

    @Prop()
    isRevoked: boolean;

    @Prop()
    expirationTime: Date

}

export const TokenSchema =
    SchemaFactory.createForClass(Token)