import { UserRolesEnum } from '../../scripts/Users/userRolesEnum';
import { ITimeStampable } from './ITimeStampable';
import { Types } from 'mongoose';
export interface IUser extends ITimeStampable {
    email: string;
    firstName: string;
    lastName: string;
    dateOfBirth: Date;
    address?: Types.ObjectId;
    notifications?: Types.ObjectId[],
    roles: UserRolesEnum[];
}
