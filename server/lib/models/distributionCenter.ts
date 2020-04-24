import * as mongoose from 'mongoose';
import { UserSchema, IUser } from './user';
import { IAddress } from './address';
import { IDatable } from './IDatable';

const Schema = mongoose.Schema;
export interface IDistributionCenter extends IDatable{
    name: string,
    host: IUser,
    address: mongoose.Types.ObjectId
}

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