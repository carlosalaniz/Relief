import { Schema, Types, SchemaType } from "mongoose";
import DataModels from ".";

export const NotificationSchema = new Schema({
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