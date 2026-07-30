import csv
import json
from collections import defaultdict

scores = defaultdict(int)

with open("data/results.csv", newline="", encoding="utf-8") as csvfile:
    reader = csv.DictReader(csvfile)

    for row in reader:
        player = row["Team name"]
        points = int(row["Points"])

        scores[player] += points

leaderboard = []

for player, total_points in scores.items():
    leaderboard.append({
        "player": player,
        "points": total_points
    })

leaderboard.sort(
    key=lambda x: x["points"],
    reverse=True
)

with open("data/scores.json", "w", encoding="utf-8") as outfile:
    json.dump(
        leaderboard,
        outfile,
        indent=2
    )

print("Leaderboard updated successfully")