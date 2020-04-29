import DataModels from "models";
import { IMealBox } from "models/interfaces/IMealBox";
import { MongooseDocument } from "mongoose";
import { IDistributionCenter } from "../../models/interfaces/IDistributionCenter";

export class MealBoxManager {
    static async get(objectId) {
        let result = await DataModels.MealBox.model.findById(objectId);
        return new MealBox(result);
    };
}

class MealBox {
    _mealBox: IMealBox;
    constructor(distributionCenter: MongooseDocument) {
        this._mealBox = <IMealBox>(<any>distributionCenter);
    }

    public async assignMealBox(distributionCenter: IDistributionCenter) {
        //todo: implement
        return true;
    }
}