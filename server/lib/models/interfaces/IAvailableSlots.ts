import { Types } from "mongoose";
import { TimeSlotStatusEnum } from "../../scripts/DistributionCenters/TimeSlotsStatusEnum";
export interface IAvailableSlot {
    day: 0 | 1 | 2 | 3 | 4 | 5 | 6;
    times: {
        startTime: string;
        endTime: string;
        status: TimeSlotStatusEnum;
        assignedMealBoxId?: Types.ObjectId;
    }[];
}
