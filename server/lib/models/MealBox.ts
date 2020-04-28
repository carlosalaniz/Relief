import * as mongoose from 'mongoose';
import { MealBoxStates, isValueValidState } from '../scripts/RPMS/stateManagement/statesEnum';
import { ItemSchema } from './items';
import { DistributionCenterSchema } from './distributionCenter';
import { BeneficiarySchema } from './beneficiary';
import DataModels from "./index";

const Schema = mongoose.Schema;
export const MealBoxSchema = new Schema({
    state: {
        type: String,
        default: MealBoxStates.pending_processing,
        validate: isValueValidState
    },

    beneficiary: BeneficiarySchema,

    items: [{
        quantity: Number,
        quantityUnit: String,
        item: ItemSchema
    }],

    donors: [
        // sub document array of donors
        {
            type: mongoose.Types.ObjectId,
            ref: DataModels.User.modelName
        }
    ],

    volunteers: [
        // sub document array of volunteers
        {
            type: mongoose.Types.ObjectId,
            ref: DataModels.User.modelName
        }
    ],

    distributionCenter: DistributionCenterSchema,

    pickupTime: {
        type: Date
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