import { IItems as IItem } from "./IItems";
import { Types } from "mongoose";
export interface IMealBoxItem {
    amount?: number;
    quantity: number;
    quantityUnit: string;
    item_objectId: Types.ObjectId;
    item?:IItem
}
