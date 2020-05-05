import { IItems as IItem } from "./IItems";
import { Types } from "mongoose";
export interface IMealBoxItem {
    amount?: number;
    quantity: number;
    quantityUnit: string;
    itemId: Types.ObjectId;
    item?:IItem
}
