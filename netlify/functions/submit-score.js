import { getStore } from "@netlify/blobs";

export default async (request) => {

  if (request.method !== "POST") {
    return new Response(
      JSON.stringify({
        error: "Method not allowed"
      }),
      {
        status: 405,
        headers: {
          "Content-Type": "application/json"
        }
      }
    );
  }

  const score = await request.json();

  // Basic validation
  if (
    !score.team ||
    !score.challenge ||
    score.points === undefined
  ) {
    return new Response(
      JSON.stringify({
        error: "Missing required fields"
      }),
      {
        status: 400,
        headers: {
          "Content-Type": "application/json"
        }
      }
    );
  }

  const store = getStore("leaderboard");

  // Unique key for each score
  const id = crypto.randomUUID();

  const record = {
    id,
    team: score.team,
    challenge: score.challenge,
    points: Number(score.points),
    timestamp: new Date().toISOString()
  };

  await store.setJSON(id, record);

  return new Response(
    JSON.stringify({
      success: true,
      id
    }),
    {
      headers: {
        "Content-Type": "application/json"
      }
    }
  );

};