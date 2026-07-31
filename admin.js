await fetch("/.netlify/functions/submit-score", {
    method: "POST",
    headers: {
        "Content-Type": "application/json"
    },
    body: JSON.stringify({
        team,
        challenge,
        points
    })
});