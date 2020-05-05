import { IAddress } from "../models/interfaces/IAddress";
import * as request from "superagent";

const key = "S2bZlTBSJXwjGRICH8gBMMve0RHAU5Yf";

export const GeolocationServices =  {
    getLatLongFromAddressAsync: async function (address: IAddress) {
        address.toString = () =>
            `${this.streetAddress} ${this.addressLine2}, ${this.city} ${this.zipCode}, ${this.country}`;
        const uri = `http://open.mapquestapi.com/geocoding/v1/address?key=${key}&location=${address.toString()}`
        let result = await request.get(uri)
        return result;
    }
};