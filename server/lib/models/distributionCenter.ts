import * as mongoose from 'mongoose';
import { UserSchema } from './user';
import DataModels from 'models';
import { pointSchema } from './GeoJSONPoint';
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

    stock: {
        type: [{
            amount: Number,
            quantity: Number,
            quantityUnit: String,
            item_objectId: mongoose.Types.ObjectId,
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
        type: [String]
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