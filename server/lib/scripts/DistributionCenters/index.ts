import DataModels from "models";
import { Mongoose, MongooseDocument } from "mongoose";

export class DistributionCenterManager {
    static async get(objectId) {
        let result = await DataModels.DistributionCenter.model.findById(objectId);
        return new DistributionCenter(result);
    };
}

class DistributionCenter {
    private _distributionCenter: MongooseDocument;
    private priorityQueue: any;
    constructor(distributionCenter: MongooseDocument) {
        this._distributionCenter = distributionCenter;
    }
    public addRequestToProcessQueue(mealBox: MongooseDocument) {
        //todo: implement queueing
    }
}