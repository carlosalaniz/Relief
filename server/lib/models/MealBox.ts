import * as mongoose from 'mongoose';
import { isValueValidState } from '../scripts/RPMS/stateManagement/statesEnum';
import { MealBoxStates } from "../scripts/MealBox/MealBoxStates";
import { ItemSchema } from './items';
import { DistributionCenterSchema } from './distributionCenter';
import { BeneficiarySchema } from './beneficiary';
import DataModels from "./index";

const Schema = mongoose.Schema;
export const MealBoxSchema = new Schema({
    status: {
        type: String,
        default: MealBoxStates.pending_processing,
        validate: isValueValidState
    },

    beneficiary: BeneficiarySchema,

    items: {
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

    distributionCenter: {
        type: mongoose.Types.ObjectId,
        ref: DataModels.DistributionCenter.modelName
    },

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