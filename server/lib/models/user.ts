import * as mongoose from 'mongoose';
import { isValidUserRole, UserRolesEnum } from '../scripts/Users/userRolesEnum';
import { IDatable } from './IDatable';

const Schema = mongoose.Schema;
export interface IUser extends IDatable{
    email: string,
    firstName: string,
    lastName: string,
    dateOfBirth: Date,
    address: mongoose.Types.ObjectId,
    roles: UserRolesEnum[]
}

export const UserSchema = new Schema({
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
    
    roles: {
        type: [String],
        required: 'role is required',
        validate: (arr: string[]) => arr.every(isValidUserRole)
    },
    
    address: mongoose.Types.ObjectId,
    
    createdAt: {
        type: Date,
        default: Date.now
    },
    
    updatedAt: {
        type: Date,
        default: Date.now
    },
});
