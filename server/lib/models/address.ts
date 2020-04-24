import * as mongoose from 'mongoose';
import { IDatable } from './IDatable';

const Schema = mongoose.Schema;

export interface IAddress extends IDatable {
    streetAddress: string,
    addressLine2: string,
    city: string,
    state: string,
    zipCode: string,
    country: string
}

export const AddressSchema = new Schema({
    streetAddress: {
        type: String
    },
    addressLine2: {
        type: String
    },
    city: {
        type: String
    },
    state: {
        type: String
    },
    zipCode: {
        type: String
    },
    country: {
        type: String
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