export default async () => {

  return new Response(
    JSON.stringify({
      success: true,
      message: "Leaderboard API is working!"
    }),
    {
      headers: {
        "Content-Type": "application/json"
      }
    }
  );

};