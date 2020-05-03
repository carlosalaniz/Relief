import * as mongoose from 'mongoose';
import { SampleSchema } from '../models/sampleModel';
import { Request, Response } from 'express';

const Sample = mongoose.model('Sample', SampleSchema.schema);
export class SampleController {

    public getAllSample(req: Request, res: Response) {
        Sample.find({}, (err, sample) => {
            if (err) {
                res.send(err);
            }
            res.json(sample);
        });
    }

    public addNewSample(req: Request, res: Response) {
        let newSample = new Sample(req.body);

        newSample.save((err, sample) => {
            if (err) {
                res.send(err);
            }
            res.json(sample);
        });
    }
}