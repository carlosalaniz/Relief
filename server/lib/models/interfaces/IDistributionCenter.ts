import { IUser } from "./IUser";
import { ITimeStampable } from './ITimeStampable';
import { IPointGeometry } from "./IGeoJSONPoint";
import { IMealBoxItem } from "./IMealBoxItem";
export interface IDistributionCenter extends ITimeStampable {
    name: string;
    host: IUser;
    address: any;
    status: string;
    location: IPointGeometry,
    stock?: IMealBoxItem[],
    mealBoxQueue: string[]
}
