import * as mongoose from 'mongoose';
import { ReliefPackageStates, isValueValidState } from '../scripts/RPMS/stateManagement/statesEnum';
import { ItemSchema, IItems as IItem } from './items';
import { UserSchema } from './user';
import { DistributionCenterSchema, IDistributionCenter } from './distributionCenter';
import { BeneficiarySchema } from './beneficiary';
import { IDatable } from './IDatable';

const Schema = mongoose.Schema;

export interface IReliefPackage extends IDatable{
    state : string,
    items: {
        quantity: number,
        quantityUnit: string,
        item: IItem
    }[]
    donors: mongoose.Types.ObjectId[]
    volunteers: mongoose.Types.ObjectId[],
    distributionCenter: IDistributionCenter,
    pickupTime: Date,
    createdAt: Date,
    updatedAt: Date
}
export const ReliefPackageSchema = new Schema({
    state: {
        type: String,
        default: ReliefPackageStates.RequestCreated,
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
        mongoose.Types.ObjectId
    ],
    
    volunteers: [
        // sub document array of volunteers
        mongoose.Types.ObjectId
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