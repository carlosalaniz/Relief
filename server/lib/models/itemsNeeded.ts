import * as mongoose from 'mongoose';
import { ItemSchema } from './items';


const Schema = mongoose.Schema;

const SchemaDefinition = new Schema({
    item: {
        type: mongoose.Types.ObjectId,
        ref: ItemSchema.modelName,
        required: 'item id is required'
    },
    message: {
        type: String,
        required: 'give me a message!'
    }
});


export const ItemsNeededSchema: { schema: mongoose.Schema, modelName: string } = {
    schema: SchemaDefinition,
    modelName: "ItemsNeeded"
}