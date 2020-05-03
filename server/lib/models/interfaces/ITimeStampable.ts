import { IIDAble } from "./IIDAble";

export interface ITimeStampable extends IIDAble {
    createdAt?: Date,
    updatedAt?: Date
}