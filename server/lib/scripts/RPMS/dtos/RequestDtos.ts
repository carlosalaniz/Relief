import { IHouseholdMemberInfo } from "models/interfaces/IHouseholdMemberInfo";
import { IPointGeometry } from "models/interfaces/IGeoJSONPoint";
import { Types } from "mongoose";

export interface RequestMealBox {
    headOfHouseHoldId: Types.ObjectId,
    location: IPointGeometry,
    householdInformation: IHouseholdMemberInfo[];
}