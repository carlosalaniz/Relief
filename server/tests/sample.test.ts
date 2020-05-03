import * as mongoose from "mongoose";
import 'mocha';
import { assert, expect } from "chai";
import { UserManager } from '../lib/scripts/Users'
import { RPMS } from '../lib/scripts/RPMS'
import { IUser } from "../lib/models/interfaces/IUser";
import { IAddress } from "../lib/models/interfaces/IAddress";
import { UserRolesEnum } from "../lib/scripts/Users/userRolesEnum";
import { dropAllCollectionsAsync, initMongo } from "./utils";
import { AgeGroupsEnum } from "../lib/scripts/Users/ageGroupsEnum";
import { RequestMealBox } from "../lib/scripts/RPMS/dtos/RequestDtos";
import { INotification } from "../lib/models/interfaces/INotification";
import { DataModels } from "../lib/models";


initMongo();

async function InsertUser() {
    console.log("inserting user")
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
    let result = <any>await UserManager.create(userData, addressData);
    let user = await UserManager.get(result._id);
    return user;
}

async function issueMealBoxRequest(user) {
    console.log("creating meal box request object")
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
    let handleResponse = await rpms.handleMealBoxRequestAsync(RequestMealBox);
    return handleResponse;
}

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

    it('Create Meal Box Request - No Distribution centers in area', async function () {
        console.log("deleting collections")
        await dropAllCollectionsAsync(mongoose);

        console.log("inserting user")
        let user = await InsertUser();

        console.log("creating meal box request object")
        let handleResponse = await issueMealBoxRequest(user);

        let beforeNotifications = user.getObject().notifications;
        let afterNotifications = await (await UserManager.get(user.getObject()._id)).getObject().notifications;
        let notification = <INotification>(<any>await DataModels.Notification.model.findById(afterNotifications[0]));

        // Check that teh response is a notification
        expect(handleResponse).to.haveOwnProperty("channel");

        // No notification present in the user model before the request got processed
        expect(beforeNotifications.length).to.equal(0);

        // Exactly one notification for user after the request got handled 
        expect(afterNotifications.length).to.equal(1);

        // Check that the notification contents are correct
        expect(notification.channel).to.equal("MealBoxUpdates");
        expect(notification.messageType).to.equal("ErrorProcessing");
        expect(notification.messagePayload).to.equal("NoDistributionCenterAvailableInArea");
    })

})
