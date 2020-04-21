import { Request, Response, Application } from "express";
import { SampleController } from "../controllers/sampleController";
export class SampleRoutes {
    public sampleController: SampleController = new SampleController();
    public routes(app: Application): void {
        app.route('/')
            .get((req: Request, res: Response) => {
                res.status(200).send({
                    message: 'hello world'
                })
            })

        app.route('/sample')
            .get(this.sampleController.getAllSample)
            .post(this.sampleController.addNewSample);
    }
}