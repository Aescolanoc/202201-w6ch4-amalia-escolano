import * as dotenv from 'dotenv';
dotenv.config();
import { MongoClient } from 'mongodb';

export async function mongoConnect() {
    const user = process.env.DBUSER;
    const password = process.env.DBPASSWORD;
    const dbName = process.env.DBNAME;
    const uri = `mongodb+srv://${user}:${password}@cluster0.vdfih.mongodb.net/${dbName}?retryWrites=true&w=majority`;
    console.log(uri);

    const mongoClient = new MongoClient(uri);
    const mongoConnect = await mongoClient.connect();
    const dbCoders = mongoConnect.db();

    return { mongoClient, dbCoders }; // cliente y base de datos
}

// conector especifico de la base de datos
export async function thingsConnect() {
    const collection = 'things';
    const { mongoClient, dbCoders } = await mongoConnect();
    const thingsCollection = dbCoders.collection(collection);
    return { mongoClient, thingsCollection };
}
