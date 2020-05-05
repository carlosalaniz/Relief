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
import { IDistributionCenter } from "../lib/models/interfaces/IDistributionCenter";
import { TimeSlotStatusEnum } from "../lib/scripts/DistributionCenters/TimeSlotsStatusEnum";
import { DistributionCenterStatusEnum } from "../lib/scripts/DistributionCenters/DistributionCenterStatusEnum";
import { DistributionCenterManager } from "../lib/scripts/DistributionCenters";
import { IAvailableSlot } from "../lib/models/interfaces/IAvailableSlots";


initMongo();
async function InsertUser() {
    let addressData: IAddress = {
        streetAddress: "1206 honeysuckle ln",
        city: "Pflugerville",
        state: "TX",
        zipCode: "78660",
        country: "US",
        location: {
            type: "Point",
            coordinates: [
                -97.609092,
                30.435117
            ]
        }
    };

    let userData: IUser = {
        email: "carlos@gmail.com",
        firstName: "carlos",
        lastName: "alaniz",
        dateOfBirth: new Date("09/14/1993"),
        roles: [UserRolesEnum.Donor],
        address: addressData
    };
    let result = <any>await UserManager.create(userData);
    let user = await UserManager.get(result._id);
    return user;
}

async function InsertUser2() {
    let addressData: IAddress = {
        streetAddress: "1017 Lanark Loop",
        city: "Pflugerville",
        state: "TX",
        zipCode: "78660",
        country: "US",
        location: {
            type: "Point",
            coordinates: [
                -97.640003,
                30.465817
            ]
        }
    };

    let userData: IUser = {
        email: "John.Doe@gmail.com",
        firstName: "John",
        lastName: "Doe",
        dateOfBirth: new Date("12/01/1980"),
        roles: [UserRolesEnum.Donor],
        address: addressData
    };
    let result = <any>await UserManager.create(userData);
    let user = await UserManager.get(result._id);
    return user;
}

async function InsertUser3() {
    let addressData: IAddress = {
        streetAddress: "1310 Katie Lynch Dr",
        city: "Pflugerville",
        state: "TX",
        zipCode: "78660",
        country: "US",
        location: {
            type: "Point",
            coordinates: [
                -97.632201,
                30.462182
            ]
        }
    };

    let userData: IUser = {
        email: "Jane.Doe@gmail.com",
        firstName: "Jane",
        lastName: "Doe",
        dateOfBirth: new Date("02/15/1895"),
        roles: [UserRolesEnum.Donor],
        address: addressData
    };
    let result = <any>await UserManager.create(userData);
    let user = await UserManager.get(result._id);
    return user;
}

async function InsertUser4() {
    let addressData: IAddress = {
        streetAddress: "1704 Serenity Dr",
        city: "Pflugerville",
        state: "TX",
        zipCode: "78660",
        country: "US",
        location: {
            type: "Point",
            coordinates: [
                -97.627740,
                30.415910
            ]
        }
    };

    let userData: IUser = {
        email: "Richard.Roe@gmail.com",
        firstName: "Richard",
        lastName: "Roe",
        dateOfBirth: new Date("08/05/1991"),
        roles: [UserRolesEnum.Donor],
        address: addressData
    };
    let result = <any>await UserManager.create(userData);
    let user = await UserManager.get(result._id);
    return user;
}

async function InsertDistributionCenter(host: IUser) {
    let availableSlots: IAvailableSlot[] = [
        {
            day: 1,
            times: [
                {
                    startTime: "09:00",
                    endTime: "09:30",
                    status: TimeSlotStatusEnum.PendingConfirmation
                },
                {
                    startTime: "10:00",
                    endTime: "11:00",
                    status: TimeSlotStatusEnum.Confirmed
                },
                {
                    startTime: "12:00",
                    endTime: "13:00",
                    status: TimeSlotStatusEnum.Confirmed
                },
                {
                    startTime: "13:15",
                    endTime: "14:00",
                    status: TimeSlotStatusEnum.Open
                }
            ]
        }
    ];
    let distributionCenter = await DistributionCenterManager.create(availableSlots, host);
    return distributionCenter;
}

async function InsertDistributionCenter2(host: IUser) {
    let availableSlots: IAvailableSlot[] = [
        {
            day: 1,
            times: [{
                startTime: "09:00",
                endTime: "09:30",
                status: TimeSlotStatusEnum.PendingConfirmation
            },
            {
                startTime: "10:00",
                endTime: "11:00",
                status: TimeSlotStatusEnum.Confirmed
            },
            {
                startTime: "12:00",
                endTime: "13:00",
                status: TimeSlotStatusEnum.Confirmed
            },
            {
                startTime: "13:15",
                endTime: "14:00",
                status: TimeSlotStatusEnum.Open
            }
            ]
        },
        {
            day: 3,
            times: [
                {
                    startTime: "17:00",
                    endTime: "18:00",
                    status: TimeSlotStatusEnum.Open
                },
                {
                    startTime: "18:00",
                    endTime: "19:00",
                    status: TimeSlotStatusEnum.Open
                }
            ]
        },
        {
            day: 4,
            times: [
                {
                    startTime: "17:00",
                    endTime: "18:00",
                    status: TimeSlotStatusEnum.Open
                },
                {
                    startTime: "18:00",
                    endTime: "19:00",
                    status: TimeSlotStatusEnum.Open
                },
                {
                    startTime: "19:00",
                    endTime: "19:30",
                    status: TimeSlotStatusEnum.Open
                }
            ]
        }
    ];
    let distributionCenter = await DistributionCenterManager.create(availableSlots, host);
    return distributionCenter;
}

async function InsertDistributionCenter3(host: IUser) {
    let availableSlots: IAvailableSlot[] = [
        {
            day: 1,
            times: [{
                startTime: "08:00",
                endTime: "09:00",
                status: TimeSlotStatusEnum.Open
            },
            {
                startTime: "10:00",
                endTime: "11:00",
                status: TimeSlotStatusEnum.Open
            },
            {
                startTime: "12:00",
                endTime: "13:00",
                status: TimeSlotStatusEnum.Open
            },
            {
                startTime: "13:00",
                endTime: "14:00",
                status: TimeSlotStatusEnum.Open
            }
            ]
        },
        {
            day: 3,
            times: [
                {
                    startTime: "17:00",
                    endTime: "18:00",
                    status: TimeSlotStatusEnum.Open
                },
                {
                    startTime: "18:00",
                    endTime: "19:00",
                    status: TimeSlotStatusEnum.Open
                }
            ]
        },
        {
            day: 4,
            times: [
                {
                    startTime: "17:00",
                    endTime: "18:00",
                    status: TimeSlotStatusEnum.Open
                },
                {
                    startTime: "18:00",
                    endTime: "19:00",
                    status: TimeSlotStatusEnum.Open
                },
                {
                    startTime: "19:00",
                    endTime: "19:30",
                    status: TimeSlotStatusEnum.Open
                }
            ]
        }
    ]
        ;
    let distributionCenter = DistributionCenterManager.create(availableSlots, host);
    return distributionCenter;
}

async function issueMealBoxRequest(user: IUser) {

    let RequestMealBox: RequestMealBox = {
        headOfHouseHoldId: user._id,
        location: user.address.location,
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

// describe('Insertions', function () {
//     it('Insert User', async function () {
//         // Drop everything before starting
//         await dropAllCollectionsAsync(mongoose);

//         // Insert user
//         let user = await InsertUser();

//         // Document to Object
//         let obj = user.getObject();
//         assert(obj);
//     });

//     it('Create Meal Box Request - No Distribution centers in area', async function () {
//         // Drop everything before starting
//         await dropAllCollectionsAsync(mongoose);

//         // Insert user
//         let user = await InsertUser();

//         // Issue a request for a Meal Box
//         await DataModels.DistributionCenter.model.ensureIndexes();
//         let handleResponse = await issueMealBoxRequest(user.getObject());

//         let beforeNotifications = user.getObject().notifications;
//         let afterNotifications = await (await UserManager.get(user.getObject()._id)).getObject().notifications;
//         let notification = <INotification>(<any>await DataModels.Notification.model.findById(afterNotifications[0]));

//         // Check that teh response is a notification
//         expect(handleResponse.response).to.haveOwnProperty("channel");

//         // No notification present in the user model before the request got processed
//         expect(beforeNotifications.length).to.equal(0);

//         // Exactly one notification for user after the request got handled 
//         expect(afterNotifications.length).to.equal(1);

//         // Check that the notification contents are correct
//         expect(notification.channel).to.equal("MealBoxUpdates");
//         expect(notification.messageType).to.equal("ErrorProcessing");
//         expect(notification.messagePayload).to.equal("NoDistributionCenterAvailableInArea");
//     })

//     it('Create Meal Box Request - Distribution centers in area', async function () {
//         // Drop everything before starting
//         await dropAllCollectionsAsync(mongoose);

//         // Insert users
//         let host = await InsertUser();
//         let host2 = await InsertUser2();
//         let host3 = await InsertUser3();

//         let user = await InsertUser4();

//         // Insert distribution centers
//         await DataModels.DistributionCenter.model.ensureIndexes();
//         let distributionCenterBefore = await InsertDistributionCenter(host.getObject());
//         let distributionCenterBefore2 = await InsertDistributionCenter2(host2.getObject());
//         let distributionCenterBefore3 = await InsertDistributionCenter3(host3.getObject());

//         // Issue a request for a Meal Box
//         let handleResponse = await issueMealBoxRequest(user.getObject());

//         expect(handleResponse.response).to.be.an("array").and.to.have.lengthOf(3);

//         let distributionCenterAfter =
//             (await DistributionCenterManager.get(distributionCenterBefore.getObject()._id))
//                 .getObject();
//         let distributionCenterAfter2 =
//             (await DistributionCenterManager.get(distributionCenterBefore2.getObject()._id))
//                 .getObject();
//         let distributionCenterAfter3 =
//             (await DistributionCenterManager.get(distributionCenterBefore3.getObject()._id))
//                 .getObject();

//         expect(distributionCenterAfter.mealBoxQueue).to.be.an("array").and.to.have.lengthOf(1);
//         expect(distributionCenterAfter2.mealBoxQueue).to.be.an("array").and.to.have.lengthOf(1);
//         expect(distributionCenterAfter3.mealBoxQueue).to.be.an("array").and.to.have.lengthOf(1);

//         let distributionCenter1MealBoxId = distributionCenterAfter.mealBoxQueue[0].toString();
//         let distributionCenter2MealBoxId = distributionCenterAfter2.mealBoxQueue[0].toString();
//         let distributionCenter3MealBoxId = distributionCenterAfter3.mealBoxQueue[0].toString();

//         let mealBoxId = handleResponse.mealBox._id.toString();
//         expect(distributionCenter1MealBoxId).to.equal(mealBoxId)
//         expect(distributionCenter2MealBoxId).to.equal(mealBoxId)
//         expect(distributionCenter3MealBoxId).to.equal(mealBoxId)
//     })
// });

describe('Queue processing', function () {
    it('Process Queue on all Distribution Centers ', async function () {
        // Drop everything before starting
        await dropAllCollectionsAsync(mongoose);

        // Insert users
        let host = await InsertUser();
        let host2 = await InsertUser2();
        let host3 = await InsertUser3();

        let user = await InsertUser4();

        // Insert distribution centers
        await DataModels.DistributionCenter.model.ensureIndexes();
        let distributionCenterBefore = await InsertDistributionCenter(host.getObject());
        let distributionCenterBefore2 = await InsertDistributionCenter2(host2.getObject());
        let distributionCenterBefore3 = await InsertDistributionCenter3(host3.getObject());
        let stockedDC = distributionCenterBefore2.getObject();
        await DataModels.DistributionCenter.model.findByIdAndUpdate(stockedDC._id, {
            status: DistributionCenterStatusEnum.Stocked
        })
        // Issue a request for a Meal Box
        let handleResponse = await issueMealBoxRequest(user.getObject());

        expect(handleResponse.response).to.be.an("array").and.to.have.lengthOf(3);

        let distributionCenterAfter =
            (await DistributionCenterManager.get(distributionCenterBefore.getObject()._id));
        let distributionCenterAfter2 =
            (await DistributionCenterManager.get(distributionCenterBefore2.getObject()._id));
        let distributionCenterAfter3 =
            (await DistributionCenterManager.get(distributionCenterBefore3.getObject()._id));

        await distributionCenterAfter.processQueueElementsAsync();

        await distributionCenterAfter2.processQueueElementsAsync();
    })



})
