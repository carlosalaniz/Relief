import * as mongoose from 'mongoose';

export const SchemaDefinition = new mongoose.Schema({
    type: {
        type: String,
        enum: ['Point'],
        required: true
    },
    coordinates: {
        type: [Number],
        required: true
    }
});

export const pointSchema: { schema: mongoose.Schema, modelName: string } = {
    schema: SchemaDefinition,
    modelName: "point"
}