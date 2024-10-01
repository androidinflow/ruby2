import { json } from '@sveltejs/kit';
import { candies } from "../../../../db/candies";
import { ObjectId } from 'mongodb';

/** @type {import('./$types').RequestHandler} */
export async function DELETE({ params }) {
    const id = params.id;
    
    try {
        const result = await candies.deleteOne({ _id: new ObjectId(id) });
        if (result.deletedCount === 1) {
            return json({ message: "Candy deleted successfully" }, { status: 200 });
        } else {
            return json({ error: "Candy not found" }, { status: 404 });
        }
    } catch (error) {
        console.error('Error deleting candy:', error);
        return json({ error: 'Failed to delete candy' }, { status: 500 });
    }
}
