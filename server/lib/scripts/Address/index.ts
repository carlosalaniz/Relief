import { DataModels } from "../../models";
import { Document } from "mongoose";
import { IUser } from "../../models/interfaces/IUser";
import { _mongooseTransactionAsync } from "../../scripts/common";
import { IAddress } from "../../models/interfaces/IAddress";

export class AddressManager {
    static async get(objectId) {
        let result = await DataModels.Address.model.findById(objectId);
        return new Address(result);
    };
    static async create(address: IAddress): Promise<Document> {
        let result: Document = null;
        await _mongooseTransactionAsync(async () => {
            result = await new DataModels.Address.model(address).save()
        });
        return result;
    }
}

export class Address {
    private _addressDocument: Document;
    private _address: IAddress;

    private init(addressDocument: Document) {
        this._address = <IAddress>(<any>addressDocument);
        this._addressDocument = addressDocument;
    }

    constructor(addressDocument: Document) {
        this.init(addressDocument);
    }
}