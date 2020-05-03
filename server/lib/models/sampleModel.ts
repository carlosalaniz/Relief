import * as mongoose from 'mongoose';

const Schema = mongoose.Schema;

const SchemaDefinition = new Schema({
    firstName: {
        type: String,
        required: 'Enter a first name'
    },
    lastName: {
        type: String,
        required: 'Enter a last name'
    },
    message:{
        type:String,
        required: 'give me a message!'
    }
});


export const SampleSchema = {
    schema: SchemaDefinition,
    modelName: "Sample"
}