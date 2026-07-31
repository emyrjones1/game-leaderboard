const form = document.getElementById("scoreForm");
const message = document.getElementById("message");


form.addEventListener("submit", async function(event) {

    event.preventDefault();


    const team = document.getElementById("team").value;
    const challenge = document.getElementById("challenge").value;
    const points = document.getElementById("points").value;


    message.textContent = "Submitting score...";


    try {

        const response = await fetch(
            "/.netlify/functions/submit-score",
            {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    team,
                    challenge,
                    points
                })
            }
        );


        const result = await response.json();


        if (result.success) {

            message.textContent = "✅ Score submitted successfully!";

            form.reset();

        } else {

            message.textContent =
                "❌ Error: " + result.error;

        }


    } catch (error) {

        console.error(error);

        message.textContent =
            "❌ Could not submit score.";

    }

});