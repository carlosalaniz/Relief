import * as mongoose from 'mongoose';
import { isValueValidState } from '../scripts/RPMS/stateManagement/statesEnum';
import { MealBoxStates } from "../scripts/MealBox/MealBoxStates";
import { ItemSchema } from './items';
import { BeneficiarySchema } from './beneficiary';
import { UserSchema } from './user';

const Schema = mongoose.Schema;
const SchemaDefinition = new Schema({
    status: {
        type: String,
        default: MealBoxStates.pending_processing,
        validate: isValueValidState
    },

    beneficiary: BeneficiarySchema.schema,

    items: {
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

    donors: [
        // sub document array of donors
        {
            type: mongoose.Types.ObjectId,
            ref: UserSchema.modelName
        }
    ],

    volunteers: [
        // sub document array of volunteers
        {
            type: mongoose.Types.ObjectId,
            ref: UserSchema.modelName
        }
    ],

    distributionCenter: {
        type: mongoose.Types.ObjectId
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

export const MealBoxSchema = {
    schema: SchemaDefinition,
    modelName: "MealBox",
    model: mongoose.model("MealBox", SchemaDefinition)
}