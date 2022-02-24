import { thingsConnect } from './db.js';
import { ObjectId } from 'mongodb';

export async function getAllthings() {
    const { thingsCollection, mongoClient } = await thingsConnect(); //conexion
    const cursor = thingsCollection.find();
    const result = await cursor.toArray();
    mongoClient.close();
    return result;
}

export async function getThing(id) {
    const dbId = ObjectId(id); // para convertir en objectos los Id
    const { thingsCollection, mongoClient } = await thingsConnect();
    const result = await thingsCollection.findOne({ _id: dbId });
    mongoClient.close();
    return result;
}

export async function insertThing(thing) {
    const { thingsCollection, mongoClient } = await thingsConnect();
    const result = await thingsCollection.insertOne(thing);
    mongoClient.close();
    return result;
}

export async function updateThing(id, partialthing) {
    const dbId = ObjectId(id);
    const { thingsCollection, mongoClient } = await thingsConnect();
    const result = await thingsCollection.findOneAndUpdate(
        { _id: dbId },
        {
            $set: { ...partialthing },
        }
    );
    mongoClient.close();
    return result;
}

export async function deletethings(id) {
    const dbId = ObjectId(id);
    const { thingsCollection, mongoClient } = await thingsConnect();
    const result = await thingsCollection.findOneAndDelete({ _id: dbId });
    mongoClient.close();
    return result;
}
