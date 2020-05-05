import { ITimeStampable } from './ITimeStampable';
import { IPointGeometry } from './IGeoJSONPoint';
export interface IAddress extends ITimeStampable {
    streetAddress: string;
    addressLine2?: string;
    city: string;
    state: string;
    zipCode: string;
    location: IPointGeometry;
    country: string;
}
