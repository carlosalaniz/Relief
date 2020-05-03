export function isAgeGroupValid(value){
    return value in AgeGroupsEnum;
}

export enum AgeGroupsEnum {
    ZeroToTwo = "ZeroToTwo", 
    ThreeToEight = "ThreeToEight", 
    NineToEleven = "NineToEleven", 
    TwelveToEighteen = "TwelveToEighteen", 
    NineteenToFiftyFive = "NineteenToFiftyFive", 
    OverFiftyFive = "OverFiftyFive"
}