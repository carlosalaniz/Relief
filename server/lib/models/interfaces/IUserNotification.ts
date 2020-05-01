import { ITimeStampable } from "./ITimeStampable";

export interface IUserNotification extends ITimeStampable {
    channel: string,
    message: {
        type: string,
        payload: any
    },
    for?: any
}