import { ITimeStampable } from './ITimeStampable';
import { IPointGeometry } from "./IGeoJSONPoint";
import { IMealBoxItem } from "./IMealBoxItem";
import { Types } from "mongoose";
import { DistributionCenterStatusEnum } from "../../scripts/DistributionCenters/DistributionCenterStatusEnum";
import { IAvailableSlot } from "./IAvailableSlots";
import { IAddress } from "./IAddress";

export interface IDistributionCenter extends ITimeStampable {
    host: Types.ObjectId;
    address: IAddress;
    availableSlots: IAvailableSlot[],
    status: DistributionCenterStatusEnum;
    stock?: IMealBoxItem[],
    mealBoxQueue: Types.ObjectId[]
    notifications: Types.ObjectId[]
}