import { IUser } from "./IUser";
import { ITimeStampable } from './ITimeStampable';
import { IPointGeometry } from "./IGeoJSONPoint";
import { IMealBoxItem } from "./IMealBoxItem";
import { TimeSlotStatusEnum } from "scripts/DistributionCenters/TimeSlotsStatusEnum";
export interface IDistributionCenter extends ITimeStampable {
    name: string;
    host: IUser;
    address: any;
    availableSlots: {
        day: 0 | 1 | 2 | 3 | 4 | 5 | 6,
        times: {
            startTime: Date,
            endTime: Date,
            status: TimeSlotStatusEnum,
            assignedMealBoxId: any
        }[]
    }[],
    status: string;
    location: IPointGeometry,
    stock?: IMealBoxItem[],
    mealBoxQueue: string[]
}


var times = [
    {
        day: 0,
        times: [
            { assigned: true },
            { assigned: true },
            { assigned: true }
        ]
    },
    {
        day: 1,
        times: [
            { assigned: true },
            { assigned: false },
            { assigned: true }
        ]
    },
    {
        day: 2,
        times: [
            { assigned: true },
            { assigned: true },
            { assigned: true }
        ]
    }
]