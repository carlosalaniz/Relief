import { DataModels }  from "../../models";
import { IMealBox } from "../../models/interfaces/IMealBox";
import { MongooseDocument } from "mongoose";
import { IDistributionCenter } from "../../models/interfaces/IDistributionCenter";
import { MealBoxStates } from "./MealBoxStates";

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
        if(this._mealBox.status !== MealBoxStates.pending_processing){
            return false;
        }
        return await DataModels.MealBox.model.findByIdAndUpdate(
            this._mealBox._id,
            { 
                distributionCenter: distributionCenter._id,
                status: MealBoxStates.assigned_to_distribution_center
            },
            { new: true }
        );
    }
}