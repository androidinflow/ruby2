import { candies } from "../db/candies";

export const load = async () => {
    const data = await candies.find({}).sort({ _id: -1 }).toArray();
    const serializedData = data.map(doc => ({
        ...doc,
        _id: doc._id.toString()
    }));
    return {
        candies: serializedData
    };
};
