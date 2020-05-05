import * as mongoose from "mongoose"
import { Schema, Types, SchemaType } from "mongoose";

const SchemaDefinition = new Schema({
    channel: String,

    messageType: String,
    
    messagePayload:String,

    model: {
        type: String,
        index: true
    },

    for: {
        type: Types.ObjectId,
        index: true
    },
    createdAt: {
        type: Date,
        default: Date.now
    },
    updatedAt: {
        type: Date,
        default: Date.now
    },
});

export const NotificationSchema = {
    schema: SchemaDefinition,
    modelName: "Notification",
    model: mongoose.model("Notification", SchemaDefinition)
}