import { IItems as IItem } from "./IItems";
export interface IMealBoxItem {
    amount?: number;
    quantity: number;
    quantityUnit: string;
    item_objectId: any;
    item?:IItem
}
