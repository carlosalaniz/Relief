import { IUser } from "./IUser";
import { ITimeStampable } from './ITimeStampable';
import { IHouseholdMemberInfo } from "./IHouseholdMemberInfo";
import { IPointGeometry } from "./IGeoJSONPoint";
import { Types } from "mongoose";

export interface IBeneficiaryFamily extends ITimeStampable {
    headOfHouseHold: Types.ObjectId;
    householdInformation: IHouseholdMemberInfo[];
    location: IPointGeometry
}
