import { json } from '@sveltejs/kit';
import { candies } from "../../../db/candies";

// @ts-ignore
export async function POST({ request }) {
    const candy = await request.json();
    
    if (!candy.name || !candy.age) {
        return json({ error: 'Name and age are required' }, { status: 400 });
    }

    try {
        const result = await candies.insertOne(candy);
        return json({ id: result.insertedId }, { status: 201 });
    } catch (error) {
        console.error('Error inserting candy:', error);
        return json({ error: 'Internal server error' }, { status: 500 });
    }
}
