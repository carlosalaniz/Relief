import * as mongoose from 'mongoose';

const Schema = mongoose.Schema;

const SchemaDefinition = new Schema({
    itemName: {
        type: String,
        required: 'itemName is required.'
    },

    pictureUrl: {
        type: String,
        required: 'pictureUrl is required.'
    },

    nutritionalValue: {
        caloriesPerPortion: {
            type: Number
        },
        PortionValue: {
            type: Number
        },
        PortionUnit: {
            // Oz, lbs, etc
            type: String
        }
    },

    // allergen, nuts, non-perishable, etc.
    tags: {
        type: [String],
        index: true
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

export const ItemSchema: { schema: mongoose.Schema, modelName: string } = {
    schema: SchemaDefinition,
    modelName: "Item"
}