import { getStore } from "@netlify/blobs";

export default async () => {

  const store = getStore("leaderboard");

  const scores = await store.getJSON("scores");

  return new Response(
    JSON.stringify({
      success: true,
      scores: scores ?? []
    }),
    {
      headers: {
        "Content-Type": "application/json"
      }
    }
  );

};