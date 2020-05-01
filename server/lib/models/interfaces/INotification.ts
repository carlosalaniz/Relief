import { ITimeStampable } from "./ITimeStampable";

export interface INotification extends ITimeStampable {
    channel: string,
    message: {
        type: string,
        payload: any
    },
    model?: string,
    for?: any
}