import { DataModels } from "../../models";
import { Document, Types } from "mongoose";
import { DistributionCenterStatusEnum } from "./DistributionCenterStatusEnum";
import { IDistributionCenter } from "../../models/interfaces/IDistributionCenter";
import { IAvailableSlot } from "../../models/interfaces/IAvailableSlots";
import { MealBoxManager } from "../../scripts/MealBox";
import { _mongooseTransactionAsync } from "../../scripts/common";
import { IMealBox } from "../../models/interfaces/IMealBox";
import { MealBoxStates } from "../MealBox/MealBoxStates";
import { UserManager } from "../../scripts/Users";
import { UserNotificationChannelEnum }
    from "../common/UserNotificationChannelEnum";
import { MealBoxUpdatesMessageType } from "../../scripts/Users/MealBoxUpdatesMessageType";
import { TimeSlotStatusEnum } from "./TimeSlotsStatusEnum";
import { INotification } from "../../models/interfaces/INotification";
import { DistributionCenterChannelEnum } from "./DistributionCenterChannelEnum";
import { IUser } from "../../models/interfaces/IUser";
import { UserRolesEnum } from "../../scripts/Users/userRolesEnum";

var shuffle: <T> (array: T[], options?: { copy: boolean }) => T[] = require("shuffle-array");

type availableSlotsReturnType = {
    slotDay: 0 | 1 | 2 | 3 | 4 | 5 | 6;
    startTime: string;
    endTime: string;
    slotIndex: number,
    timeIndex: number
};
export class DistributionCenterManager {
    static async get(objectId) {
        let result = await DataModels.DistributionCenter.model.findById(objectId);
        return new DistributionCenter(result);
    };
    static async create(availableSlots: IAvailableSlot[], host: IUser) {
        let dCenterData: IDistributionCenter = {
            host: host._id,
            status: DistributionCenterStatusEnum.Empty,
            address: host.address,
            availableSlots: availableSlots,
            stock: [],
            mealBoxQueue: [],
            notifications: []
        };

        let distributionCenter = null;

        await _mongooseTransactionAsync(async () => {
            distributionCenter = await (new DataModels.DistributionCenter.model(dCenterData)).save();
            let hostDo = <any>await DataModels.User.model.findById(host._id);
            if (!hostDo.roles.includes(UserRolesEnum.DistributionCenterHost)) {
                hostDo.roles.push(UserRolesEnum.DistributionCenterHost);
                await hostDo.save();
            }
        });

        return this.get(distributionCenter);
    };
}
export class DistributionCenter {

    constructor(distributionCenter: Document) {
        this.init(distributionCenter);
    }

    private _distributionCenter: IDistributionCenter;
    private errors = {
        StockUnAvailable: "stock un available",
        MealBoxAssigned: "MealBoxAssigned",
        NoTimeSlotsAvailable: "NoTimeSlotsAvailable",
    }

    private async refreshDocumentAsync() {
        let result = await DataModels.DistributionCenter.model.findById(this._distributionCenter._id);
        this.init(result);
    }

    private init(distributionCenter: Document) {
        this._distributionCenter = <IDistributionCenter>(<any>distributionCenter);
    }

    public getObject(): IDistributionCenter {
        return <IDistributionCenter>(<any>this._distributionCenter).toObject();
    }
    /** PRIVATE METHODS */

    private async isStockAvailable() {
        // TODO: implement
        return DistributionCenterStatusEnum.Stocked;
    }

    private async reserveStockAsync() {
        // TODO: implement
        return true;
    }

    private getAvailableTimeSlots(): availableSlotsReturnType[] {
        let today = new Date();
        let allSlots = this._distributionCenter.availableSlots;
        let availableSlots = allSlots
            .map((slot, index) => {
                slot['index'] = index;
                slot.times = slot.times.map((time, index) => {
                    time['index'] = index;
                    return time;
                }).filter(time => !time.assignedMealBoxId && time.status === TimeSlotStatusEnum.Open);
                return slot;
            })
            // TODO: add logic to account for hours of the day, select every time slot where day and time is at least X hours away
            .filter(day => day.day > today.getDay() && day.times.length > 0)
            .map((slot) => {
                return slot.times.map((time, timeIndex) => {
                    let timeObj = {
                        slotDay: slot.day,
                        startTime: time.startTime,
                        endTime: time.endTime,
                        slotIndex: slot['index'],
                        timeIndex: time['index']
                    }
                    return timeObj;
                })
            }).reduce(el => [...el]);
        return shuffle(availableSlots, { copy: true }).slice(0, 5);
    }

    private async reserveTimeSlotsAsync(selectedTimeSlots: availableSlotsReturnType[], mealBox: IMealBox) {
        let newTimeSlots = this._distributionCenter.availableSlots;

        selectedTimeSlots.forEach(slot => {
            let currentStatus = newTimeSlots[slot.slotIndex].times[slot.timeIndex].status;
            if (currentStatus === TimeSlotStatusEnum.Open) {
                newTimeSlots[slot.slotIndex].times[slot.timeIndex].assignedMealBoxId = mealBox._id;
                newTimeSlots[slot.slotIndex].times[slot.timeIndex].status = TimeSlotStatusEnum.PendingConfirmation
            } else {
                throw new Error(this.errors.NoTimeSlotsAvailable);
            }
        })

        return await DataModels.DistributionCenter.model.findByIdAndUpdate(
            this._distributionCenter._id,
            { availableSlots: newTimeSlots },
            { new: true }
        );
    }

    /** PUBLIC METHODS */

    public async addRequestToProcessQueueAsync(mealBox: IMealBox) {
        let queue = this._distributionCenter.mealBoxQueue;
        queue.push(mealBox._id);
        return await DataModels.DistributionCenter.model.findByIdAndUpdate(
            this._distributionCenter._id,
            { mealBoxQueue: queue },
            { new: true }
        );
    }

    public async notifyDistributionCenter(message: INotification) {
        let notification = message;
        message.for = this._distributionCenter._id;
        message.model = DataModels.DistributionCenter.modelName;

        let notificationDocument = null;
        notificationDocument = await new DataModels.Notification.model(notification);
        notificationDocument.save();
        return notificationDocument;
    }

    public async updateStatusAsync(status) {
        return await DataModels.DistributionCenter.model.findByIdAndUpdate(
            this._distributionCenter._id,
            { status: status },
            { new: true }
        );
    }

    public async processQueueElementsAsync() {
        let queue = this._distributionCenter.mealBoxQueue;
        while (queue.length > 0) {
            if (this._distributionCenter.status === DistributionCenterStatusEnum.Empty) {
                break;
            }

            let mealBoxId = queue.shift();
            let mealBox = await MealBoxManager.get(mealBoxId);

            if (!await this.isStockAvailable()) {
                // send signal
                await this.notifyDistributionCenter(
                    {
                        channel: DistributionCenterChannelEnum.DistributionCenterStockStatus,
                        messageType: MealBoxUpdatesMessageType.StatusUpdates,
                        messagePayload: DistributionCenterStatusEnum.Empty
                    }
                );

                //save new state
                await _mongooseTransactionAsync(async () => {
                    await this.updateStatusAsync(DistributionCenterStatusEnum.Empty)
                });

                //end loop
                return;
            }

            if (mealBox._mealBox.status !== MealBoxStates.pending_processing) continue;

            try {
                await _mongooseTransactionAsync(async () => {
                    if (await this.reserveStockAsync()) {
                        let mealBoxAssigned = await mealBox.assignMealBox(this._distributionCenter);
                        if (mealBoxAssigned) {
                            let availableSlots = this.getAvailableTimeSlots();
                            if (availableSlots.length > 0) {
                                let headOfHouseHoldId = mealBox._mealBox.beneficiary.headOfHouseHold;
                                await this.reserveTimeSlotsAsync(availableSlots, mealBox._mealBox);
                                let user = await UserManager.get(headOfHouseHoldId);
                                await user.notifyUserAsync({
                                    channel: UserNotificationChannelEnum.MealBoxUpdates,
                                    messageType: MealBoxUpdatesMessageType.TimeSelectionMessage,
                                    messagePayload: JSON.stringify(availableSlots)
                                });
                            } else {
                                throw new Error(this.errors.NoTimeSlotsAvailable);
                            }
                        } else {
                            throw new Error(this.errors.MealBoxAssigned);
                        }
                    } else {
                        throw new Error(this.errors.StockUnAvailable);
                    }
                });
                await this.refreshDocumentAsync();
            } catch (error) {
                let headOfHouseHoldId = mealBox._mealBox.beneficiary.headOfHouseHold;
                let user = await UserManager.get(headOfHouseHoldId)

                let channel = null;
                let message = {
                    messageType: null,
                    messagePayload: null
                }

                switch (error.message) {
                    case this.errors.StockUnAvailable:
                        channel = UserNotificationChannelEnum.MealBoxUpdates;
                        message.messageType = MealBoxUpdatesMessageType.ErrorProcessing;
                        message.messagePayload = this.errors.StockUnAvailable;
                        break;
                    case this.errors.MealBoxAssigned:
                        channel = UserNotificationChannelEnum.MealBoxUpdates;
                        message.messageType = MealBoxUpdatesMessageType.ErrorProcessing;
                        message.messagePayload = this.errors.StockUnAvailable;
                        break;
                    case this.errors.NoTimeSlotsAvailable:
                        channel = UserNotificationChannelEnum.MealBoxUpdates;
                        message.messageType = MealBoxUpdatesMessageType.ErrorProcessing;
                        message.messagePayload = this.errors.StockUnAvailable;
                        break;
                }

                await _mongooseTransactionAsync(async () => {
                    await user.notifyUserAsync({
                        channel: channel,
                        ...message
                    });
                });
            }
        };
    }

    public async confirmTimeSlotAsync(userId: Types.ObjectId, selectedTimeSlot: availableSlotsReturnType) {
        let newTimeSlots = this._distributionCenter.availableSlots;
        newTimeSlots[selectedTimeSlot.slotIndex].times[selectedTimeSlot.timeIndex].status = TimeSlotStatusEnum.Confirmed;
        try {
            await _mongooseTransactionAsync(async () => {
                await DataModels.DistributionCenter.model.findByIdAndUpdate(
                    this._distributionCenter._id,
                    { availableSlots: newTimeSlots },
                    { new: true }
                );
                let user = await UserManager.get(userId);
                await user.notifyUserAsync({
                    channel: UserNotificationChannelEnum.MealBoxUpdates,
                    messageType: MealBoxUpdatesMessageType.TimeSelectionMessage,
                    messagePayload: JSON.stringify(selectedTimeSlot)
                })
            })
        } catch (e) {
            // TODO: better error handling
            console.log(e);
            throw e;
        }
    }
}