import * as mongoose from 'mongoose';
import { UserSchema } from './user';
import { pointSchema } from './geoJSONPoint';
import { ItemSchema } from './items';
import { MealBoxSchema } from './mealBox';
import { AddressSchema } from './address';
import { NotificationSchema } from './notification';
const Schema = mongoose.Schema;
const TimeValidator = {
    validator: function (v) {
        return /([0-1][0-9]|2[0-4]):([0-5][0-9]|60)/.test(v);
    },
    message: props => `${props.value} is not a time!`
}
const availableSlotsSchema = new Schema({
    day: Number,
    times: [
        {
            startTime: {
                type: String,
                validate: TimeValidator,
                required: true
            },
            endTime: {
                type: String,
                validate: TimeValidator,
                required: true
            },
            status: String,
            assignedMealBoxId: {
                type: mongoose.Types.ObjectId,
                ref: MealBoxSchema.modelName
            }
        }
    ]
});

const SchemaDefinition = new Schema({
    host: {
        type: mongoose.Types.ObjectId,
        ref: UserSchema.modelName,
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

    address: AddressSchema.schema,
    
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
SchemaDefinition.index({ "address.location": "2dsphere" });

export const DistributionCenterSchema = {
    schema: SchemaDefinition,
    modelName: "DistributionCenter",
    model: mongoose.model("DistributionCenter", SchemaDefinition)
}