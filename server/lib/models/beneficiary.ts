import * as mongoose from 'mongoose';
import { isAgeGroupValid } from '../scripts/Users/beneficiaryEnums';
import { UserSchema } from './user';
import { IUser } from "./interfaces/IUser";
import { UserRolesEnum } from '../scripts/Users/userRolesEnum';
import DataModels from 'models';
import { pointSchema } from './geoJSONPoint';
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
    },
    headOfHouseHold: {
        type: Boolean
    }
});

export const BeneficiarySchema = new Schema({
    headOfHouseHold: {
        type: mongoose.Types.ObjectId,
        ref: DataModels.User.modelName,
        validate: validateHeadOfHouseHold
    },
    householdInformation: [HouseHoldMember],
    address: {
        type: mongoose.Types.ObjectId,
        ref: DataModels.Address.modelName
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