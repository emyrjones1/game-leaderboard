import { getStore } from "@netlify/blobs";

export default async () => {

    const store = getStore("leaderboard");

    // Get a list of every stored score
    const { blobs } = await store.list();

    const scores = [];

    // Read every score
    for (const blob of blobs) {

        const score = await store.get(blob.key, {
            type: "json"
        });

        if (score) {
            scores.push(score);
        }

    }

    // Sort newest first
    scores.sort((a, b) =>
        new Date(b.timestamp) - new Date(a.timestamp)
    );

    return new Response(
        JSON.stringify({
            success: true,
            scores
        }),
        {
            headers: {
                "Content-Type": "application/json"
            }
        }
    );

};