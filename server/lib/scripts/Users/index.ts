import { IUser } from "../../models/interfaces/IUser";
import { DataModels } from "../../models";
import { Document } from "mongoose"
import { INotification } from "../../models/interfaces/INotification";
import { _mongooseTransactionAsync } from "../../scripts/common";
import { IAddress } from "../../models/interfaces/IAddress";
import { AddressManager } from "../../scripts/Address";
export class UserManager {
    static async get(objectId) {
        let result = await DataModels.User.model.findById(objectId);
        return new User(result);
    };
    static async create(user: IUser): Promise<Document> {
        let result = null;
        await _mongooseTransactionAsync(async () => {
            result = await new DataModels.User.model(user).save()
        });
        return result;
    }
}

export class User {
    private _userDocument: Document;
    private _user: IUser;

    private init(userDocument: Document) {
        this._user = <IUser>(userDocument.toObject());
        this._userDocument = userDocument;
    }

    constructor(userDocument: Document) {
        this.init(userDocument);
    }
    public getObject = () => this._user;
    public async getNotifications() {
        let notifications = this._user.notifications;
        return notifications;
    }

    public async notifyUserAsync(message: INotification) {
        let userNotificationDocument = null;
        await _mongooseTransactionAsync(async () => {
            let notification = message;
            message.for = this._user._id;
            message.model = DataModels.User.modelName;
            userNotificationDocument = await new DataModels.Notification.model(notification);
            userNotificationDocument.save();
            let user = <any>await DataModels.User.model.findById(this._user._id);
            user.notifications.push(userNotificationDocument._id);
            let new_user = await user.save()
        })
        return userNotificationDocument;
    }
}