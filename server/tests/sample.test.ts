import * as mongoose from "mongoose";
import 'mocha';
import { assert } from "chai";
import { UserManager } from '../lib/scripts/Users'
import { RPMS } from '../lib/scripts/RPMS'
import { IUser } from "../lib/models/interfaces/IUser";
import { IAddress } from "../lib/models/interfaces/IAddress";
import { UserRolesEnum } from "../lib/scripts/Users/userRolesEnum";
import { dropAllCollectionsAsync, initMongo } from "./utils";
import { AgeGroupsEnum } from "../lib/scripts/Users/ageGroupsEnum";
import { RequestMealBox } from "../lib/scripts/RPMS/dtos/RequestDtos";


initMongo();
describe('Insertions', function () {
    it('Insert User', async function () {
        console.log("deleting collections before beginning testing")
        await dropAllCollectionsAsync(mongoose);
        console.log("done");

        let addressData: IAddress = {
            streetAddress: "1206 honeysuckle ln",
            city: "Pflugerville",
            state: "TX",
            zipCode: "78660",
            country: "US"
        };
        let userData: IUser = {
            email: "carlos@gmail.com",
            firstName: "carlos",
            lastName: "alaniz",
            dateOfBirth: new Date("09/14/1993"),
            roles: [UserRolesEnum.Volunteer]
        };
        console.log("inserting user")
        let result = <any>await UserManager.create(userData, addressData);
        console.log("done")
        let user = await UserManager.get(result._id)
        let obj = user.getObject();
        assert(obj);
    });
});

describe('Queue processing', function () {
    it('Create Meal Box Request', async function () {
        console.log("deleting collections before beginning testing")
        await dropAllCollectionsAsync(mongoose);
        console.log("done");

        let addressData: IAddress = {
            streetAddress: "1206 honeysuckle ln",
            city: "Pflugerville",
            state: "TX",
            zipCode: "78660",
            country: "US"
        };
        let userData: IUser = {
            email: "carlos@gmail.com",
            firstName: "carlos",
            lastName: "alaniz",
            dateOfBirth: new Date("09/14/1993"),
            roles: [UserRolesEnum.Volunteer]
        };
        console.log("inserting user")
        let result = <any>await UserManager.create(userData, addressData);
        let user = await UserManager.get(result._id)
        let RequestMealBox: RequestMealBox = {
            headOfHouseHoldId: user.getObject()._id,
            location: {
                type: "Point",
                coordinates: [
                    -97.6198917902995, 30.443612432495513
                ]
            },
            householdInformation: [
                {
                    sex: "male",
                    ageGroup: AgeGroupsEnum.NineteenToFiftyFive,
                    headOfHouseHold: true
                },
                {
                    sex: "female",
                    ageGroup: AgeGroupsEnum.NineteenToFiftyFive,
                    allergies: ["peanuts"],
                    specialGroups: ["diabetic"],
                    headOfHouseHold: false
                },
                {
                    sex: "male",
                    ageGroup: AgeGroupsEnum.NineToEleven,
                    headOfHouseHold: false
                },
            ]
        }
        let rpms = new RPMS();
        let r = await rpms.handleMealBoxRequestAsync(RequestMealBox);
    })

})
