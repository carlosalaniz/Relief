import { IUser } from "../../models/interfaces/IUser";
import DataModels from "../../models";
import { Document } from "mongoose"
import { INotification } from "../../models/interfaces/INotification";
import { _mongooseTransactionAsync } from "../../scripts/common";
export class UserManager {
    static async get(objectId) {
        let result = await DataModels.DistributionCenter.model.findById(objectId);
        return new User(result);
    };
}

export class User {
    private _userDocument: Document;
    private _user: IUser;

    private init(userDocument: Document) {
        this._user = <IUser>(<any>userDocument);
        this._userDocument = userDocument;
    }

    constructor(userDocument: Document) {
        this.init(userDocument);
    }

    public async getNotifications() {
        let notifications = this._user.notifications;
        return notifications;
    }

    public async notifyUserAsync(message: INotification) {
        let notification = message;
        message.for = this._user._id;
        message.model = DataModels.User.modelName;
        let userNotificationDocument = null;
        userNotificationDocument = await new DataModels.Notification.model(notification);
        userNotificationDocument.save();
        return userNotificationDocument;
    }
}