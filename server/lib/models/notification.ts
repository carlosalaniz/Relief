import { Schema, Types } from "mongoose";
import DataModels from ".";

export const NotificationSchema = new Schema({
    channel: String,
    message: Schema.Types.Mixed,
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