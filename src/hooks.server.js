import { startMongo } from "./db/mongo";

startMongo().then(() => {
    console.log("Mongo started.");
}).catch((err) => {
    console.log("Error starting mongo from hooks", err);
});