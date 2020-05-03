import { ITimeStampable } from "./ITimeStampable";

export interface INotification extends ITimeStampable {
    channel: string,
    messageType: string
    messagePayload: string
    model?: string,
    for?: any
}