import DataModels from "models";
import { Mongoose, Document } from "mongoose";
import { DistributionCenterStatusEnum } from "./DistributionCenterStatusEnum";
import { IDistributionCenter } from "../../models/interfaces/IDistributionCenter";
import { MealBoxManager } from "../../scripts/MealBox";
import { _mongooseTransactionAsync } from "../../scripts/common";
import { IMealBox } from "../../models/interfaces/IMealBox";
import { MealBoxStates } from "../MealBox/MealBoxStates";

export class DistributionCenterManager {
    static async get(objectId) {
        let result = await DataModels.DistributionCenter.model.findById(objectId);
        return new DistributionCenter(result);
    };
}
class DistributionCenter {
    private _distributionCenterDocument: Document;
    private _distributionCenter: IDistributionCenter;
    private init(distributionCenter: Document) {
        this._distributionCenter = <IDistributionCenter>(<any>distributionCenter);
        this._distributionCenterDocument = distributionCenter;
    }
    constructor(distributionCenter: Document) {
        this.init(distributionCenter);
    }

    private async isStockAvailable(mealBox: IMealBox) {
        return DistributionCenterStatusEnum.Stocked;
    }

    private async reserveStockAsync(mealBox: IMealBox) {
        return true;
    }

    private getAvailableTimeSlots() {
        return this._distributionCenter.availableSlots
            .map((day, index) => {
                day['index'] = index;
                day.times = day.times.map((time, index) => {
                    time['index'] = index;
                    return time;
                }).filter(time => !time.assignedMealBoxId);
                return day;
            }
            )
            .filter(day => day.times.length > 0);
            // todo: return maximum 3 times. 
    }

    private async reserveTimeSlotsAsync(selectedTimeSlots, mealBox: IMealBox) {
        try {
            await _mongooseTransactionAsync(async () => {
                let newSlots = this._distributionCenterDocument['availableSlots'];

                selectedTimeSlots.forEach(timeSlot => {
                    timeSlot.times.forEach(times => {
                        newSlots[timeSlot.index].times[times.index].assignedMealBoxId = mealBox._id;
                    });
                })

                let newDocument = await DataModels.DistributionCenter.model.findByIdAndUpdate(
                    this._distributionCenter._id,
                    { availableSlots: selectedTimeSlots },
                    { new: true }
                );

                // update the class with it's new data
                this.init(newDocument);
            });
        } catch (error) {
            // todo: error handling 
            console.log(error);
        }
    }

    public addRequestToProcessQueue(mealBox: Document) {
        //todo: implement queueing
    }

    public async sendStatusNotification(status) {
        //todo: add messaging queue
        console.warn(this._distributionCenter._id, status);
    }

    public async updateStatusAsync(status) {
        await _mongooseTransactionAsync(async () => {
            let newDocument = await DataModels.DistributionCenter.model.findByIdAndUpdate(
                this._distributionCenter._id,
                { status: status },
                { new: true }
            );
            // update the class with it's new data
            this.init(newDocument);
        });
    }

    public async processQueueElementsAsync() {
        let queue = this._distributionCenter.mealBoxQueue;
        while (queue.length > 0) {
            if (this._distributionCenter.status === DistributionCenterStatusEnum.Empty) {
                break;
            }

            let mealBoxId = queue.shift();
            let mealBox = await MealBoxManager.get(mealBoxId);
            if (mealBox._mealBox.status === MealBoxStates.pending_processing
                && !await this.isStockAvailable(mealBox._mealBox)) {
                // send signal
                await this.sendStatusNotification(DistributionCenterStatusEnum.Empty);

                //save new state
                await this.updateStatusAsync(DistributionCenterStatusEnum.Empty)

                //end loop
                break;
            }

            //Process MealBox
            if (await this.reserveStockAsync(mealBox._mealBox)) {
                let mealBoxAssigned = mealBox.assignMealBox(this._distributionCenter);
                if (mealBoxAssigned) {
                    let availableSlots = this.getAvailableTimeSlots();
                    if (availableSlots.length > 0) {

                    } else {

                    }
                }
            }
        };
    }

}