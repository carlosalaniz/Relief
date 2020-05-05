import * as mongoose from 'mongoose';
import { pointSchema } from './geoJSONPoint';

const Schema = mongoose.Schema;

const SchemaDefinition = new Schema({
    streetAddress: {
        type: String
    },
    addressLine2: {
        type: String
    },
    city: {
        type: String
    },
    state: {
        type: String
    },
    zipCode: {
        type: String
    },
    country: {
        type: String
    },
    createdAt: {
        type: Date,
        default: Date.now
    },
    updatedAt: {
        type: Date,
        default: Date.now
    },
    location: {
        type: pointSchema.schema,
        required: true
    },
}); 
// TODO: export everything separate or follow a singleton pattern single object causes Cannot overwrite `XXX` model once compiled.
export let AddressSchema = {
    schema: SchemaDefinition,
    modelName: "Address",
    model: mongoose.model("Address", SchemaDefinition)
}