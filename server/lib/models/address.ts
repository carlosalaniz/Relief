import * as mongoose from 'mongoose';

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
});

export const AddressSchema: {
    schema: mongoose.Schema<any>;
    modelName: string;
    model: mongoose.Model<mongoose.Document, {}>;
} = {
    schema: SchemaDefinition,
    modelName: "Address",
    model: mongoose.model("Address", SchemaDefinition)
}