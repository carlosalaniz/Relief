import * as mongoose from 'mongoose';
import { isValidUserRole } from '../scripts/Users/userRolesEnum';
import { AddressSchema } from './address';
import { NotificationSchema } from './notification';
const Schema = mongoose.Schema;

const SchemaDefinition = new Schema({
    email: {
        type: String,
        unique: true,
        required: 'email is required.',
        match: [/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/, 'Invalid email address']
    },

    firstName: {
        type: String,
        required: 'firstName is required.'
    },

    lastName: {
        type: String,
        required: 'lastName is required.'
    },

    dateOfBirth: {
        type: Date,
        required: 'dateOfBirth is required.'
    },

    address: {
        type: mongoose.Types.ObjectId, ref: AddressSchema.modelName
    },

    notifications: [{
        type: mongoose.Types.ObjectId,
        ref: NotificationSchema.modelName
    }],

    roles: {
        type: [String],
        required: 'role is required',
        validate: (arr: string[]) => arr.every(isValidUserRole)
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

export const UserSchema: { schema: mongoose.Schema, modelName: string } = {
    schema: SchemaDefinition,
    modelName: "User"
}