import { IUser } from "./IUser";
import { ITimeStampable } from './ITimeStampable';
import { IPointGeometry } from "./IGeoJSONPoint";
import { IMealBoxItem } from "./IMealBoxItem";
import { TimeSlotStatusEnum } from "scripts/DistributionCenters/TimeSlotsStatusEnum";
import { Types } from "mongoose";
export interface IDistributionCenter extends ITimeStampable {
    name: string;
    host: IUser;
    address: Types.ObjectId;
    availableSlots: {
        day: 0 | 1 | 2 | 3 | 4 | 5 | 6,
        times: {
            startTime: Date,
            endTime: Date,
            status: TimeSlotStatusEnum,
            assignedMealBoxId: Types.ObjectId
        }[]
    }[],
    status: string;
    location: IPointGeometry,
    stock?: IMealBoxItem[],
    mealBoxQueue: Types.ObjectId[]
    notifications: Types.ObjectId[]
}