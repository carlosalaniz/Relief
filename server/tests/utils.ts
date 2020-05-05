import * as mongoose from "mongoose";
import * as dotenv from 'dotenv';
import * as path from 'path';
import { DataModels } from "../lib/models";

export async function dropAllCollectionsAsync(mongoose: mongoose.Mongoose) {
    let collections = mongoose.connection.collections;
    for (let collection in collections) {
        try {
            await collections[collection].drop();
        } catch (e) {
            //collection is not found 
            // console.log(e);
        }
    }
}

export function initMongo() {
    let base = process.cwd().split("\\").pop();;
    let envPath = path.join((process.cwd() + (base === "Relief" ? "/server" : "")), './tests/tests.env');
    dotenv.config({ path: envPath });
    function mongoSetup() {
        (<any>mongoose.Promise) = global.Promise;
        mongoose.connect(process.env.DB_CONNECTION_STRING, {
            useCreateIndex: true,
            useNewUrlParser: true,
            useUnifiedTopology: true,
            useFindAndModify: false
        });
    }
    //initialize mongo
    mongoSetup();
}