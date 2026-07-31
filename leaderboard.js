let lastScoreId = localStorage.getItem("lastScoreId");

let lastCelebration = "";
let celebrationTime = 0;


async function loadLeaderboard() {

    const container = document.getElementById("leaderboard");


    try {

        const response = await fetch(
            "/.netlify/functions/get-leaderboard"
        );


        const data = await response.json();


        if (!data.success) {
            throw new Error("Failed to load scores");
        }


        const scores = data.scores;


        if (scores.length === 0) {

            container.innerHTML = `

                <div class="competition-banner">

                    <h1>
                        🏔️ OCAT Team Challenge 🏔️
                    </h1>


                    <h2>
                        Scores reset!
                    </h2>


                    <p>
                        The competition begins soon.
                    </p>


                    <p>
                        Good luck teams! 🎉
                    </p>

                </div>


                <div class="empty">

                    Waiting for the first score...

                </div>

            `;

            return;

        }


        // ----------------------------
        // Detect new score
        // ----------------------------

        const newestScore = scores[0];


        if (
            lastScoreId &&
            newestScore.id !== lastScoreId
        ) {


            lastCelebration = `

                <div class="celebration">

                    🎉 NEW SCORE! 🎉

                    <br><br>

                    ${newestScore.team}

                    scored

                    ${newestScore.points}

                    points

                    <br>

                    in ${newestScore.challenge}

                </div>

            `;


            celebrationTime = Date.now();

        }


        // Save latest score seen

        lastScoreId = newestScore.id;

        localStorage.setItem(
            "lastScoreId",
            lastScoreId
        );



        // ----------------------------
        // Calculate totals
        // ----------------------------

        const totals = {};


        scores.forEach(score => {


            if (!totals[score.team]) {

                totals[score.team] = 0;

            }


            totals[score.team] += score.points;


        });



        const rankings =
            Object.entries(totals)
            .map(([team, points]) => ({
                team,
                points
            }))
            .sort((a,b)=>b.points-a.points);



        const highest =
            rankings[0].points;



        const leader =
            rankings[0];



        let celebration = "";


        // Show celebration for 15 seconds

        if (
            Date.now() - celebrationTime < 15000
        ) {

            celebration = lastCelebration;

        }



        // ----------------------------
        // Build page
        // ----------------------------

        let html = `


        ${celebration}


        <div class="leader">

            <div>
                🏔️ CURRENT LEADER
            </div>

            <h1>
                ${leader.team}
            </h1>

            <h2>
                ${leader.points} points
            </h2>

        </div>



        <h2>
            🏆 Current Standings
        </h2>


        `;



        rankings.forEach((team,index)=>{


            let medal = "";


            if(index === 0) medal="🥇";
            if(index === 1) medal="🥈";
            if(index === 2) medal="🥉";



            const width =
                (team.points / highest) * 100;



            html += `


            <div class="team-card">


                <div class="team-header">


                    <span class="position">

                        ${medal} ${index + 1}

                    </span>


                    <span class="team-name">

                        ${team.team}

                    </span>


                    <span class="points">

                        ${team.points}

                    </span>


                </div>



                <div class="bar">

                    <div 
                    class="fill"
                    style="width:${width}%">

                    </div>

                </div>


            </div>


            `;


        });



        html += `


        <h2>
            📢 Latest Scores
        </h2>


        <div class="recent">


        `;



        scores
        .slice(0,5)
        .forEach(score=>{


            html += `

            <p>

            <strong>
                ${score.team}
            </strong>

            scored

            <strong>
                ${score.points}
            </strong>

            points in

            ${score.challenge}

            </p>


            `;


        });



        html += `

        </div>

        `;



        container.innerHTML = html;



    }
    catch(error){


        console.error(error);


        container.innerHTML =
        "Unable to load leaderboard";


    }


}



loadLeaderboard();



setInterval(
    loadLeaderboard,
    30000
);