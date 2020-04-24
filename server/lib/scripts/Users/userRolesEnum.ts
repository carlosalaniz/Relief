export function isValidUserRole(value: string) {
    return value in UserRolesEnum;
}
export enum UserRolesEnum {
    Donor = "Donor",
    Volunteer = "Volunteer",
    DistributionCenterHost = "DistributionCenterHost",
}