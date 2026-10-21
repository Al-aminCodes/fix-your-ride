import { MongoClient } from "mongodb";

const uri = process.env.MONGODB_URL;

if (!uri) {
  throw new Error("MONGODB_URL is missing from environment variables");
}

const globalForMongo = globalThis as typeof globalThis & {
  mongoClientPromise?: Promise<MongoClient>;
};

const clientPromise =
  globalForMongo.mongoClientPromise ?? new MongoClient(uri).connect();

if (process.env.NODE_ENV !== "production") {
  globalForMongo.mongoClientPromise = clientPromise;
}

export default clientPromise;
