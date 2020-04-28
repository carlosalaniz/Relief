import * as mongoose from 'mongoose';
import { UserSchema } from './user';
import DataModels from 'models';
import { pointSchema } from './GeoJSONPoint';
const Schema = mongoose.Schema;

export const DistributionCenterSchema = new Schema({
    name: {
        type: String
    },

    host: {
        type: UserSchema,
        required: true
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
    createdAt: {
        type: Date,
        default: Date.now
    },

    updatedAt: {
        type: Date,
        default: Date.now
    },
});