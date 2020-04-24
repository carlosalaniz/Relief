import * as mongoose from 'mongoose';
import { isAgeGroupValid } from '../scripts/Users/beneficiaryEnums';
import { IUser, UserSchema } from './user';
import { UserRolesEnum } from '../scripts/Users/userRolesEnum';
import { IDatable } from './IDatable';
const Schema = mongoose.Schema;

function getAge(birthDate: Date): number {
    var today = new Date();
    var age = today.getFullYear() - birthDate.getFullYear();
    var m = today.getMonth() - birthDate.getMonth();
    if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) {
        age--;
    }
    return age;
}

function validateHeadOfHouseHold(headOfHouseHold: IUser): boolean {
    return getAge(headOfHouseHold.dateOfBirth) >= 18
        && headOfHouseHold.roles.indexOf(UserRolesEnum.Donor) >= 0;
}


const HouseHoldMember = new Schema({
    sex: { type: String },
    //TODO: create a special group entity
    specialGroups: [
        { type: String }
    ],
    //TODO: create a allergy entity
    allergies: [
        { type: String }
    ],
    ageGroup: {
        type: String,
        validate: isAgeGroupValid
    }
});

export interface IBeneficiary extends IDatable {
    headOfHouseHold: IUser,
    householdInformation: {
        sex: string,
        allergies: string[],
        ageGroup: string
    }[]
}

export const BeneficiarySchema = new Schema({
    headOfHouseHold: {
        type: UserSchema,
        validate: validateHeadOfHouseHold
    },
    householdInformation: [HouseHoldMember],
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