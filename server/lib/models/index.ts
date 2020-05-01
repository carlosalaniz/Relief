import { AddressSchema } from "./address";
import { UserSchema } from "./user";
import { MealBoxSchema } from "./mealBox";
import { ItemSchema } from "./items";
import { DistributionCenterSchema } from "./distributionCenter";
import { BeneficiarySchema } from "./beneficiary";
import * as mongoose from "mongoose";
import { NotificationSchema } from "./notification";

interface IDataModel {
    model: mongoose.Model<mongoose.Document, {}>;
    modelName: string;
};

const DataModels: { Notification: IDataModel, Address: IDataModel, DistributionCenter: IDataModel, Item: IDataModel, User: IDataModel, Beneficiary: IDataModel, MealBox: IDataModel } = {
    Address: {
        model: mongoose.model("Address", AddressSchema),
        modelName: "Address"
    },
    DistributionCenter: {
        model: mongoose.model("DistributionCenter", DistributionCenterSchema),
        modelName: "DistributionCenter"
    },
    Item: {
        model: mongoose.model("Items", ItemSchema),
        modelName: "Items"
    },
    User: {
        model: mongoose.model("User", UserSchema),
        modelName: "User"
    },
    Beneficiary: {
        model: mongoose.model("Beneficiary", BeneficiarySchema),
        modelName: "Beneficiary"
    },
    MealBox: {
        model: mongoose.model("MealBox", MealBoxSchema),
        modelName: "MealBox",
    },
    Notification: {
        model: mongoose.model("Notification", NotificationSchema),
        modelName: "Notification",
    }
};
export default DataModels;