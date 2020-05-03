import * as mongoose from "mongoose";
import * as dotenv from 'dotenv';
import * as path from 'path';
import 'mocha';
import { assert } from "chai";
import { UserManager } from '../lib/scripts/Users'
import { IUser } from "../lib/models/interfaces/IUser";
import { IAddress } from "../lib/models/interfaces/IAddress";
import { UserRolesEnum } from "../lib/scripts/Users/userRolesEnum";
import { dropAllCollectionsAsync } from "./utils";


let base = process.cwd().split("\\").pop();;
let envPath = path.join((process.cwd() + (base === "Relief" ? "/server" : "")), './tests/tests.env');
dotenv.config({ path: envPath });
function mongoSetup() {
    (<any>mongoose.Promise) = global.Promise;
    mongoose.connect(process.env.DB_CONNECTION_STRING, {
        useCreateIndex: true,
        useNewUrlParser: true,
        useUnifiedTopology: true
    });
}
//initialize mongo
mongoSetup();


describe('Insertions', function () {
    it('Insert User', async function () {
        console.log("deleting collections before beginning testing")
        await dropAllCollectionsAsync(mongoose);
        console.log("done");

        let addressData: IAddress = {
            streetAddress: "1206 honeysuckle ln",
            city: "Pflugerville",
            state: "TX",
            zipCode: "78660",
            country: "US"
        };
        let userData: IUser = {
            email: "carlos@gmail.com",
            firstName: "carlos",
            lastName: "alaniz",
            dateOfBirth: new Date("09/14/1993"),
            roles: [UserRolesEnum.Volunteer]
        };
        console.log("inserting user")
        let result = <any>await UserManager.create(userData, addressData);
        console.log("done")
        let user = await UserManager.get(result._id)
        let obj = user.getObject();
        assert(obj);

        // expect(obj._id).to.deep.include(result._id);
        // expect(obj.address).to.deep.include(result.address);
        // expect(obj.email).to.equal(result.email);
        // expect(obj.firstName).to.equal(result.firstName);
        // expect(obj.lastName).to.equal(result.lastName);
        // expect(obj.notifications).to.include(result.notifications);
        // expect(obj.roles).to.equal(result.roles);
        // expect(obj.dateOfBirth.getTime()).to.equal(result.dateOfBirth.getTime());
        // expect(obj.createdAt.getTime()).to.equal(result.createdAt.getTime());
        // expect(obj.updatedAt.getTime()).to.equal(result.updatedAt.getTime());
    });
});


