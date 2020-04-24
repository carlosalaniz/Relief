

export enum ItemStates {
    // An user (donor) has committed to procure the item
    ItemProcurementPendingConfirmation = "ItemProcurementPendingConfirmation",

    // An item has being procured
    ItemProcurementConfirmed = "ItemProcurementConfirmed"
}

export function isValueValidState(value: string) {
    return value in ReliefPackageStates;
}

export enum ReliefPackageStates {
    // Package items have been added to a master list
    RequestCreated = "RequestCreated",

    // Order will remain in this status until most of the items have been through their life-cycle
    // TODO: Add package's item list threshold value. i.e .8 for only 80% of the item list being collected before the packages advandces
    ItemsPartiallyCollected = "RequestCreated",

    // Most items are now in possession of a donor.
    ItemsStockConfirmed = "ItemsStockConfirmed",

    // Someone needs to volunteer to assemble packages.
    SelectingVolunteerToAssemblePackage = "SelectingVolunteerToAssemblePackage",

    // Items are on stock but not with the volunteer
    ItemsPendingCollection = "ItemsPendingCollection",

    // Items are sorted, verified for expiration, etc.
    ReadyForAssemble = "ReadyForAssemble",

    // Package is assembled, alert the beneficiary
    PackageAssembled = "PackageAssembled",

    // Waiting for beneficiary's confirmation 
    PickupTimeConfirmationPending = "PickupTimeConfirmationPending",

    // Beneficiary has confirmed the pick-up time and place
    ReadyForPickup = "ReadyForPickup",

    // Beneficiary confirmed pick up
    Delivered = "Delivered"
}