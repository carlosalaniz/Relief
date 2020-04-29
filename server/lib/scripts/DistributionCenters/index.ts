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
    public addRequestToProcessQueue(mealBox: Document) {
        //todo: implement queueing
    }

    public async sendStatusNotification(status) {
        //todo: add messaging queue
        console.warn(this._distributionCenter._id, status);
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
                await _mongooseTransactionAsync(async () => {
                    let newDocument = await DataModels.DistributionCenter.model.findByIdAndUpdate(
                        this._distributionCenter._id,
                        { status: DistributionCenterStatusEnum.Empty },
                        { new: true }
                    );
                    this.init(newDocument);
                });

                //end loop
                break;
            }

            //Process MealBox
            let mealBoxAssigned = mealBox.assignMealBox(this._distributionCenter);
            if(mealBoxAssigned){
                // if box is successfully locked process
                //todo: process
            }
        };
    }

}