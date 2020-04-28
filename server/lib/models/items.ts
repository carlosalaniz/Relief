import * as mongoose from 'mongoose';

const Schema = mongoose.Schema;

export const ItemSchema = new Schema({
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