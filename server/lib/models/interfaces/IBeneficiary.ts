import { IUser } from "./IUser";
import { ITimeStampable } from './ITimeStampable';
import { IHouseholdMemberInfo } from "./IHouseholdMemberInfo";
import { IPointGeometry } from "./IGeoJSONPoint";

export interface IBeneficiaryFamily extends ITimeStampable {
    headOfHouseHold: IUser;
    householdInformation: IHouseholdMemberInfo[];
    location: IPointGeometry
}
