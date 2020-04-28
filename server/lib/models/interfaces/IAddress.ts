import { ITimeStampable } from './ITimeStampable';
export interface IAddress extends ITimeStampable {
    streetAddress: string;
    addressLine2: string;
    city: string;
    state: string;
    zipCode: string;
    country: string;
}
