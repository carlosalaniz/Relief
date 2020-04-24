import { AddressSchema } from "./address";
import { UserSchema } from "./user";
import { ReliefPackageSchema } from "./reliefPackage";
import { ItemSchema } from "./items";
import { DistributionCenterSchema } from "./distributionCenter";
import { BeneficiarySchema } from "./beneficiary";
import * as mongoose from "mongoose";

export default {
    Address: mongoose.model("Address", AddressSchema),
    DistributionCenter: mongoose.model("DistributionCenter", DistributionCenterSchema),
    Item: mongoose.model("Items", ItemSchema),
    ReliefPackage: mongoose.model("ReliefPackages", ReliefPackageSchema),
    User: mongoose.model("User", UserSchema),
    Beneficiary: mongoose.model("Beneficiary", BeneficiarySchema)
}