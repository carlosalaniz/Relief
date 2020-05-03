import * as mongoose from "mongoose"
import { Schema, Types, SchemaType } from "mongoose";

export const SchemaDefinition = new Schema({
    channel: String,

    message: {
        type: {
            type: String,
            payload: Schema.Types.Mixed
        }
    },

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

export const NotificationSchema: { schema: mongoose.Schema, modelName: string } = {
    schema: SchemaDefinition,
    modelName: "Notification"
}