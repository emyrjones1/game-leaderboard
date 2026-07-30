const API = "https://game-leaderboard-api.emyrjones2001.workers.dev";

// ---------- Leaderboard ----------

async function loadLeaderboard() {

    const table = document.querySelector("#leaderboard tbody");

    if (!table) return;

    const response = await fetch(API);

    const scores = await response.json();

    const totals = {};

    scores.forEach(score => {

        totals[score.team] =
            (totals[score.team] || 0)
            + score.points;

    });

    const leaderboard =
        Object.entries(totals)
        .sort((a,b)=>b[1]-a[1]);

    table.innerHTML="";

    leaderboard.forEach((team,index)=>{

        table.innerHTML += `

        <tr>

        <td>${index+1}</td>

        <td>${team[0]}</td>

        <td>${team[1]}</td>

        </tr>

        `;

    });

    document.getElementById("lastUpdated").textContent =
        "Updated " +
        new Date().toLocaleTimeString();

}

loadLeaderboard();

setInterval(loadLeaderboard,10000);

// ---------- Submission ----------

const form=document.getElementById("scoreForm");

if(form){

form.addEventListener("submit",async(e)=>{

e.preventDefault();

await fetch(API,{

method:"POST",

headers:{

"Content-Type":"application/json"

},

body:JSON.stringify({

team:document.getElementById("team").value,

round:Number(document.getElementById("round").value),

points:Number(document.getElementById("points").value)

})

});

document.getElementById("message").textContent="Score submitted.";

form.reset();

});

}