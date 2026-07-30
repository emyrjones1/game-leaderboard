fetch("data/scores.json")
  .then(response => response.json())
  .then(scores => {

    scores.sort((a, b) => b.points - a.points);

    const tbody = document.querySelector("#leaderboard tbody");

    scores.forEach((player, index) => {

      const row = document.createElement("tr");

      row.innerHTML = `
        <td>${index + 1}</td>
        <td>${player.player}</td>
        <td>${player.points}</td>
      `;

      tbody.appendChild(row);

    });

  });
