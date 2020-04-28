

export enum ItemStates {
    // An user (donor) has committed to procure the item
    ItemProcurementPendingConfirmation = "ItemProcurementPendingConfirmation",

    // An item has being procured
    ItemProcurementConfirmed = "ItemProcurementConfirmed"
}

export function isValueValidState(value: string) {
    return value in MealBoxStates;
}

export enum MealBoxStates {
    pending_processing =  "pending_processing"
}