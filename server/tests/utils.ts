import * as mongoose from "mongoose";

export async function dropAllCollectionsAsync (mongoose: mongoose.Mongoose ) {
    let collections = mongoose.connection.collections;
    for(let collection in collections){
        try{
            await collections[collection].drop();
        }catch(e){
            //collection is not found 
            // console.log(e);
        }
    }
}