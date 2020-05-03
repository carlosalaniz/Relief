// lib/app.ts
import * as express from "express";
import * as bodyParser from "body-parser";
import { SampleRoutes } from "./routes/sampleRoutes";
import * as dotenv from 'dotenv';
import * as path from 'path';
import * as mongoose from "mongoose";

dotenv.config({ path: path.join(process.cwd(), 'server/.env') });
class App {
    public app: express.Application;
    public sampleRoutes: SampleRoutes = new SampleRoutes();
    public mongoUrl: string = process.env.DB_CONNECTION_STRING

    constructor() {
        this.app = express();
        this.config();
        this.mongoSetup();
    }


    private mongoSetup(): void {
        (<any>mongoose.Promise) = global.Promise;
        mongoose.connect(this.mongoUrl, { 
            useCreateIndex: true,
            useNewUrlParser: true,
            useUnifiedTopology: true
        });
    }

    private config(): void {
        // support application/json type post data
        this.app.use(bodyParser.json());
        //support application/x-www-form-urlencoded post data
        this.app.use(bodyParser.urlencoded({ extended: false }));
        this.sampleRoutes.routes(this.app);
    }

}

export default new App().app;