async function loadLeaderboard() {

    const container = document.getElementById("leaderboard");


    try {

        const response = await fetch(
            "/.netlify/functions/get-leaderboard"
        );


        const data = await response.json();


        if (!data.success) {
            throw new Error("Could not load scores");
        }


        const scores = data.scores;


        // Add points by team
        const totals = {};


        scores.forEach(score => {

            if (!totals[score.team]) {
                totals[score.team] = 0;
            }

            totals[score.team] += score.points;

        });


        // Convert to sorted array
        const rankings = Object.entries(totals)
            .map(([team, points]) => ({
                team,
                points
            }))
            .sort((a,b) => b.points - a.points);



        if (rankings.length === 0) {

            container.innerHTML =
                "<p>No scores submitted yet.</p>";

            return;

        }



        let html = `
            <table class="leaderboard-table">

            <tr>
                <th>Position</th>
                <th>Team</th>
                <th>Points</th>
            </tr>
        `;



        rankings.forEach((team,index)=>{

            let medal = "";

            if(index === 0) medal = "🥇";
            if(index === 1) medal = "🥈";
            if(index === 2) medal = "🥉";


            html += `
            <tr>
                <td>${medal} ${index+1}</td>
                <td>${team.team}</td>
                <td>${team.points}</td>
            </tr>
            `;

        });



        html += "</table>";


        container.innerHTML = html;



    } catch(error) {

        console.error(error);

        container.innerHTML =
            "<p>Unable to load leaderboard.</p>";

    }

}


loadLeaderboard();


// Refresh every 10 seconds
setInterval(loadLeaderboard, 10000);