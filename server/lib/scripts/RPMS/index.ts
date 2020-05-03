import { IMealBox as IMealBox } from "../../models/interfaces/IMealBox";
import { MealBoxStates } from "../MealBox/MealBoxStates";
import { IHouseholdMemberInfo } from "models/interfaces/IHouseholdMemberInfo";
import { IMealBoxItem } from "../../models/interfaces/IMealBoxItem";
import { DataModels }  from "../../models/index";
import { RequestMealBox } from "./dtos/RequestDtos";
import { _mongooseTransactionAsync, defaults } from "../../scripts/common";
import { IPointGeometry } from "../../models/interfaces/IGeoJSONPoint";
import { DistributionCenterManager } from "../../scripts/DistributionCenters";
import { UserManager } from "../../scripts/Users";
import { UserNotificationChannelEnum } from "../../scripts/common/UserNotificationChannelEnum";
import { MealBoxUpdatesMessageType } from "../../scripts/Users/MealBoxUpdatesMessageType";

class RPMS {
    private RPMSErrors = {
        NoDistributionCenterAvailableInArea: "NoDistributionCenterAvailableInArea"
    }
    private getRequiredItems(householdMembers: IHouseholdMemberInfo[]): IMealBoxItem[] {
        //TODO: add logic here
        let fakeResponse: IMealBoxItem[] = [
            {
                quantity: 70,
                quantityUnit: "oz",
                item_objectId: null,
                item: {
                    itemName: "Pinto Beans",
                    pictureUrl: "https://images.heb.com/is/image/HEBGrocery/000125682",
                    nutritionalValue: {
                        caloriesPerPortion: 100,
                        PortionUnit: "g",
                        PortionValue: 130
                    },
                    tags: []
                },
            },
            {
                quantity: 50,
                quantityUnit: "oz",
                item_objectId: null,
                item: {
                    itemName: "Canned Chicken",
                    pictureUrl: "https://images.heb.com/is/image/HEBGrocery/prd-small/h-e-b-select-ingredients-premium-chunk-chicken-breast-in-water-000783220.jpg",
                    nutritionalValue: {
                        caloriesPerPortion: 60,
                        PortionUnit: "oz",
                        PortionValue: 2
                    },
                    tags: []
                }
            },
            {
                quantity: 50,
                quantityUnit: "oz",
                item_objectId: null,
                item: {
                    itemName: "Dry Milk",
                    pictureUrl: "https://i5.walmartimages.com/asr/477c9d7a-6d77-4850-b73f-d64663bbf5cc_1.5055a33b6f19ee5f896bb6f30ad9efcf.jpeg",
                    nutritionalValue: {
                        caloriesPerPortion: 80,
                        PortionUnit: "g",
                        PortionValue: 23
                    },
                    tags: []
                }
            },
            {
                quantity: 1080,
                quantityUnit: "g",
                item_objectId: null,
                item: {
                    itemName: "Apple sauce pouch",
                    pictureUrl: "https://images.heb.com/is/image/HEBGrocery/001800558",
                    nutritionalValue: {
                        caloriesPerPortion: 60,
                        PortionUnit: "g",
                        PortionValue: 90
                    },
                    tags: []
                }
            }
        ]
        return fakeResponse;
    }

    public async findCloseByDistributionCentersAsync(pointGeometry: IPointGeometry, distanceInMeters?: any) {
        if (!distanceInMeters) distanceInMeters = defaults.DistributionCenterDefaultDistanceInMeters;
        const distributionCenters = DataModels.DistributionCenter.model;
        try {
            let result = await distributionCenters.find({
                location: {
                    $near: {
                        $maxDistance: distanceInMeters,
                        $geometry: pointGeometry
                    }
                }
            });
            return result;
        } catch (error) {
            //TODO: do something
        }
    }

    public async handleMealBoxRequestAsync(request: RequestMealBox) {
        let requiredItems: IMealBoxItem[] = this.getRequiredItems(request.householdInformation);
        let mealBoxRequest: IMealBox = {
            beneficiary: {
                headOfHouseHold: request.headOfHouseHoldId,
                householdInformation: request.householdInformation,
                location: request.location
            },
            status: MealBoxStates.pending_processing,
            requiredItems: requiredItems
        };
        const MealBoxModel = new DataModels.MealBox.model(mealBoxRequest);
        try {
            await _mongooseTransactionAsync(async () => {
                let mealBox = await MealBoxModel.save();
                let closestDistributionCenters = await this.findCloseByDistributionCentersAsync(request.location);
                if (closestDistributionCenters.length > 0) {
                    closestDistributionCenters.forEach(async distributionCenterDocument => {
                        try {
                            let distributionCenter = await DistributionCenterManager.get(distributionCenterDocument._id);
                            await distributionCenter.addRequestToProcessQueueAsync(<IMealBox>(<any>mealBox));
                        } catch (error) {
                            //TODO: do something
                        }
                    })
                } else {
                    let user = await UserManager.get(request.headOfHouseHoldId)
                    await user.notifyUserAsync({
                        channel: UserNotificationChannelEnum.MealBoxUpdates,
                        message: {
                            type: MealBoxUpdatesMessageType.ErrorProcessing,
                            payload: this.RPMSErrors.NoDistributionCenterAvailableInArea
                        }
                    });
                }
            });
        } catch (error) {
            //TODO: do something
        }
    }
}
