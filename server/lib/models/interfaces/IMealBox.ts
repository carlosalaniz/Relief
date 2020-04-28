import { IDistributionCenter } from "./IDistributionCenter";
import { ITimeStampable } from './ITimeStampable';
import { IMealBoxItem } from "./IMealBoxItem";
export interface IMealBox extends ITimeStampable {
    state: string;
    requiredItems: IMealBoxItem[];
    items?: IMealBoxItem[];
    donors?: any[];
    volunteers?: any[];
    distributionCenter?: IDistributionCenter;
    pickupTime?: Date;
}
