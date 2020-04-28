import * as mongoose from 'mongoose';

const Schema = mongoose.Schema;

export const ItemsNeededSchema = new Schema({
    item: {
        type: mongoose.Types.ObjectId,
        required: 'item id is required'
    },
    message: {
        type: String,
        required: 'give me a message!'
    }
});