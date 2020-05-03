import * as mongoose from "mongoose";
import { AddressSchema } from "./address";
import { UserSchema } from "./user";
import { MealBoxSchema } from "./mealBox";
import { ItemSchema } from "./items";
import { DistributionCenterSchema } from "./distributionCenter";
import { BeneficiarySchema } from "./beneficiary";
import { NotificationSchema } from "./notification";

export const DataModels = {
    Address: {
        model: mongoose.model(AddressSchema.modelName, AddressSchema.schema),
        modelName: AddressSchema.modelName
    },

    DistributionCenter: {
        model: mongoose.model(DistributionCenterSchema.modelName, DistributionCenterSchema.schema),
        modelName: DistributionCenterSchema.modelName
    },

    Item: {
        model: mongoose.model(ItemSchema.modelName, ItemSchema.schema),
        modelName: ItemSchema.modelName
    },

    User: {
        model: mongoose.model(UserSchema.modelName, UserSchema.schema),
        modelName: UserSchema.modelName
    },

    Beneficiary: {
        model: mongoose.model(BeneficiarySchema.modelName, BeneficiarySchema.schema),
        modelName: BeneficiarySchema.modelName
    },

    MealBox: {
        model: mongoose.model(MealBoxSchema.modelName, MealBoxSchema.schema),
        modelName: MealBoxSchema.modelName
    },

    Notification: {
        model: mongoose.model(NotificationSchema.modelName, NotificationSchema.schema),
        modelName: NotificationSchema.modelName,
    }
};
