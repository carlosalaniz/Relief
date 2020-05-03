import * as mongoose from 'mongoose';
import { UserSchema } from './user';
import { pointSchema } from './geoJSONPoint';
import { ItemSchema } from './items';
import { MealBoxSchema } from './mealBox';
import { AddressSchema } from './address';
import { NotificationSchema } from './notification';
const Schema = mongoose.Schema;

const availableSlotsSchema = new Schema({
    day: Number,
    times: [
        {
            startTime: Date,
            endTime: Date,
            status: String,
            assignedMealBoxId: {
                type: mongoose.Types.ObjectId,
                ref: MealBoxSchema.modelName
            }
        }
    ]
});

const SchemaDefinition = new Schema({
    name: {
        type: String
    },

    host: {
        type: UserSchema.schema,
        required: true
    },

    status: {
        type: String
    },

    availableSlots: [availableSlotsSchema],

    stock: {
        type: [{
            amount: Number,
            quantity: Number,
            quantityUnit: String,
            itemId: {
                type: mongoose.Types.ObjectId,
                ref: ItemSchema.modelName
            },
            item: ItemSchema.schema
        }]
    },

    address: {
        type: mongoose.Types.ObjectId,
        ref: AddressSchema.modelName,
        required: true
    },

    location: {
        type: pointSchema.schema,
        required: true
    },

    mealBoxQueue: {
        type: [{
            type: mongoose.Types.ObjectId,
            ref: MealBoxSchema.modelName
        }]
    },

    notifications: [{
        type: mongoose.Types.ObjectId,
        ref: NotificationSchema.modelName
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

export const DistributionCenterSchema = {
    schema: SchemaDefinition,
    modelName: "DistributionCenter",
    model: mongoose.model("DistributionCenter", SchemaDefinition)
}