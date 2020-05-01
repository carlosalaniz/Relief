import * as mongoose from 'mongoose';
import { UserSchema } from './user';
import DataModels from '.';
import { pointSchema } from './geoJSONPoint';
import { ItemSchema } from './items';
const Schema = mongoose.Schema;

export const DistributionCenterSchema = new Schema({
    name: {
        type: String
    },

    host: {
        type: UserSchema,
        required: true
    },

    status: {
        type: String
    },

    availableSlots: [
        {
            day: Number,
            times: [
                {
                    startTime: Date,
                    endTime: Date,
                    status: String,
                    assignedMealBoxId: {
                        type: mongoose.Types.ObjectId,
                        ref: DataModels.MealBox.modelName
                    }
                }
            ]
        }
    ],


    stock: {
        type: [{
            amount: Number,
            quantity: Number,
            quantityUnit: String,
            itemId: {
                type: mongoose.Types.ObjectId,
                ref: DataModels.Item.modelName
            },
            item: ItemSchema
        }]
    },

    address: {
        type: mongoose.Types.ObjectId,
        ref: DataModels.Address.modelName,
        required: true
    },

    location: {
        type: pointSchema,
        required: true
    },

    mealBoxQueue: {
        type: [{
            type: mongoose.Types.ObjectId,
            ref: DataModels.Notification.modelName
        }]
    },

    notifications: [{
        type: mongoose.Types.ObjectId,
        ref: DataModels.Notification.modelName
    }],

    createdAt: {
        type: Date,
        default: Date.now
    },

    updatedAt: {
        type: Date,
        default: Date.now
    },
});