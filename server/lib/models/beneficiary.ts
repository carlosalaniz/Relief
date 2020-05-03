import * as mongoose from 'mongoose';
import { isAgeGroupValid } from '../scripts/Users/ageGroupsEnum';
import { UserSchema } from './user';
import { pointSchema } from './geoJSONPoint';
import { AddressSchema } from './address';
import { DataModels } from './';
import { IUser } from './interfaces/IUser';
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

async function validateHeadOfHouseHold(headOfHouseHold: mongoose.Types.ObjectId) {
    let user = await <any>UserSchema.model.findById(headOfHouseHold);
    return getAge(user.dateOfBirth) >= 18;
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

const SchemaDefinition = new Schema({
    headOfHouseHold: {
        type: mongoose.Types.ObjectId,
        ref: UserSchema.modelName,
        validate: validateHeadOfHouseHold
    },
    householdInformation: [HouseHoldMember],
    address: {
        type: mongoose.Types.ObjectId,
        ref: AddressSchema.modelName
    },
    location: {
        type: pointSchema.schema,
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

export const BeneficiarySchema = {
    schema: SchemaDefinition,
    modelName: "Beneficiary",
    model: mongoose.model("Beneficiary", SchemaDefinition)

}