import { UserRolesEnum } from '../../scripts/Users/userRolesEnum';
import { ITimeStampable } from './ITimeStampable';
export interface IUser extends ITimeStampable {
    email: string;
    firstName: string;
    lastName: string;
    dateOfBirth: Date;
    address: any;
    roles: UserRolesEnum[];
}
