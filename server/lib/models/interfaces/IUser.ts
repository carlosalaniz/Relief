import { UserRolesEnum } from '../../scripts/Users/userRolesEnum';
import { ITimeStampable } from './ITimeStampable';
import { Types } from 'mongoose';
import { IAddress } from './IAddress';
export interface IUser extends ITimeStampable {
    email: string;
    firstName: string;
    lastName: string;
    dateOfBirth: Date;
    address: IAddress;
    notifications?: Types.ObjectId[],
    roles: UserRolesEnum[];
}
