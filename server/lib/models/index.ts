import * as mongoose from "mongoose";
import { AddressSchema } from "./address";
import { UserSchema } from "./user";
import { MealBoxSchema } from "./mealBox";
import { ItemSchema } from "./items";
import { DistributionCenterSchema } from "./distributionCenter";
import { BeneficiarySchema } from "./beneficiary";
import { NotificationSchema } from "./notification";

export const DataModels = {
    Address: AddressSchema,

    DistributionCenter: DistributionCenterSchema,

    Item: ItemSchema,

    User: UserSchema,

    Beneficiary: BeneficiarySchema,

    MealBox: MealBoxSchema,

    Notification: NotificationSchema
};
