document
.getElementById("scoreForm")
.addEventListener("submit", function(e) {

    e.preventDefault();

    const player =
        document.getElementById("player").value;

    const round =
        document.getElementById("round").value;

    const points =
        document.getElementById("points").value;


    const body =
`Player: ${player}
Round: ${round}
Points: ${points}`;


    const issueURL =
    `https://github.com/emyrjones1/game-leaderboard/issues/new?title=New Score&body=${encodeURIComponent(body)}`;


    window.open(issueURL, "_blank");

});
