import { IHouseholdMemberInfo } from "models/interfaces/IHouseholdMemberInfo";
import { IPointGeometry } from "models/interfaces/IGeoJSONPoint";

export interface RequestMealBox {
    headOfHouseHoldEmail: string,
    location: IPointGeometry,
    householdInformation: IHouseholdMemberInfo[];
}