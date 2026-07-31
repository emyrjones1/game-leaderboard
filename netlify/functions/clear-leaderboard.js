import { getStore } from "@netlify/blobs";

export default async () => {

    const store = getStore("leaderboard");

    const { blobs } = await store.list();

    for (const blob of blobs) {

        await store.delete(blob.key);

    }


    return new Response(
        JSON.stringify({
            success: true,
            deleted: blobs.length
        }),
        {
            headers: {
                "Content-Type": "application/json"
            }
        }
    );

};