import * as mongoose from 'mongoose';
import DataModels from '.';

const Schema = mongoose.Schema;

export const ItemsNeededSchema = new Schema({
    item: {
        type: mongoose.Types.ObjectId,
        ref: DataModels.Item.modelName,
        required: 'item id is required'
    },
    message: {
        type: String,
        required: 'give me a message!'
    }
});