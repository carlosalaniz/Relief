import { IDistributionCenter } from "./IDistributionCenter";
import { ITimeStampable } from './ITimeStampable';
import { IMealBoxItem } from "./IMealBoxItem";
import { IBeneficiaryFamily } from "./IBeneficiary";
import { Types } from "mongoose";
import DataModels from "../../models";
export interface IMealBox extends ITimeStampable {
    status: string;
    requiredItems: IMealBoxItem[];
    beneficiary: IBeneficiaryFamily,
    items?: IMealBoxItem[];
    donors?: Types.ObjectId[];
    volunteers?: Types.ObjectId[];
    distributionCenter?: Types.ObjectId;
    pickupTime?: Date;
}
