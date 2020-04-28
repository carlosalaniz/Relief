import { IUser } from "./IUser";
import { ITimeStampable } from './ITimeStampable';
export interface IDistributionCenter extends ITimeStampable {
    name: string;
    host: IUser;
    address: any;
}
