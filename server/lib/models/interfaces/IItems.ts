import { ITimeStampable } from './ITimeStampable';
export interface IItems extends ITimeStampable {
    itemName: string;
    pictureUrl: string;
    nutritionalValue: {
        caloriesPerPortion: number;
        PortionValue: number;
        PortionUnit: string;
    };
    tags: string[];
}
