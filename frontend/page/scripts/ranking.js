
$(function () {
    var includes = $('[data-include]')
    $.each(includes, function () {
        var file = 'shared/' + $(this).data('include') + '.html'
        $(this).load(file)
    })
})
async function loadPlayers() {
    try {
        const response = await fetch("http://localhost:3000/player");
        const data = await response.json();
        return data;
    } catch (error) {
        console.error(error);
    }
}
async function loadGameHistory() {
    try {
        const response = await fetch("http://localhost:3000/gamehistory");
        const data = await response.json();
        return data;
    } catch (error) {
        console.error(error);
    }
}
async function loadPlacementsPoints() {
    try {
        const response = await fetch("http://localhost:3000/placmentpoints");
        const data = await response.json();
        return data;
    } catch (error) {
        console.error(error);
    }
}

function createCard(parentElement, placement, player, width, height) {

    // Create the card element
    const card = document.createElement("div");
    card.classList.add("card", "text-white", "bg-dark", "mb-3");
    //style="width: 17rem; height: 100%;"
    card.style.width = width;
    card.style.height = height;

    // Create the image element
    const img = document.createElement("img");
    img.src = player.img;
    img.classList.add("card-img-top");
    img.alt = "...";

    // Create the card body element
    const cardBody = document.createElement("div");
    cardBody.classList.add("card-body");

    // Create the title element
    const titlePlacement = document.createElement("h3");
    titlePlacement.classList.add("card-title");
    titlePlacement.textContent = placement;

    // Create the title element
    const title = document.createElement("h5");
    title.classList.add("card-text");
    title.textContent = player.name;


    // Create the fourth text element
    const text4 = document.createElement("p");
    text4.classList.add("card-text");
    text4.textContent = `Age: ${player.age}`;

    // Append all the elements to the card body
    cardBody.appendChild(titlePlacement);
    cardBody.appendChild(title);
    cardBody.appendChild(text4);

    // Append the image and card body to the card
    card.appendChild(img);
    card.appendChild(cardBody);

    // Append the card to the parent element
    parentElement.appendChild(card);
}

function getTotalWinnerPot(games) {
    var totalWinnerPots = new Map();

    for (const game of games) {
        const placements = game.placements;
        var placementIndex = 1;
        for (const placement of placements) {
            var currentPlayerPot = totalWinnerPots[placement]
            if (placementIndex == 1) {
                var gamePot = (5 * game.buyin) + game.extra;
                if (!isNaN(currentPlayerPot)) {
                    totalWinnerPots[placement] = currentPlayerPot + gamePot;
                    placementIndex++;
                    continue;
                }
                totalWinnerPots[placement] = gamePot;
                placementIndex++;
                continue;
            }
            if (placementIndex == 2) {
                var gamePot = (2 * game.buyin);
                if (!isNaN(currentPlayerPot)) {

                    totalWinnerPots[placement] = currentPlayerPot + gamePot;
                    placementIndex++;
                    continue;
                }
                totalWinnerPots[placement] = gamePot;
                placementIndex++;
                continue;
            }
            if (placementIndex == 3) {
                var gamePot = (game.buyin);
                if (!isNaN(currentPlayerPot)) {

                    totalWinnerPots[placement] = currentPlayerPot + gamePot;
                    placementIndex++;
                    continue;
                }
                totalWinnerPots[placement] = gamePot;
                placementIndex++;
                break;
            }

        }
    }
    return totalWinnerPots;
}
function getPlayerPlacements(games, placementPoints) {
    var playerPlacements = new Map();
    for (const game of games) {
        const placements = game.placements;
        var placementIndex = 1;
        for (const placement of placements) {
            var currentPlayerPlacement = playerPlacements[placement]
            var currentPlacementPoints = placementPoints[placementIndex];
            if (!isNaN(currentPlayerPlacement)) {
                playerPlacements[placement] = currentPlayerPlacement + currentPlacementPoints;
                placementIndex++;
                continue;
            }
            playerPlacements[placement] = currentPlacementPoints;
            placementIndex++;
        }
    }
    return playerPlacements;
}
function convertMapToArray(data) {
    var array = new Array()
    for (let key in data) {
        array.push({ name: key, placement: data[key] });
    }
    return array;
}

function convertWinnerPotToArray(data) {
    var array = new Array()
    array.push(["Pot", "Total Winner Pot"])
    for (let key in data) {
        array.push([key, data[key]]);
    }
    return array;
}

function createTableHr(parentElement, data) {
    for (const item of data) {
        // Create the card element
        const th = document.createElement("th");
        th.scope = "col";
        th.textContent = item;

        // Append the card to the parent element
        parentElement.appendChild(th);
    }
}
function createTableRow(parentElement, data) {
    for (const item of data) {
        var tr = document.createElement("tr");
        for (const key of Object.keys(item)) {
            // Create the card element
            const td = document.createElement("td");
            td.textContent = item[key];
            tr.appendChild(td);
            // Append the card to the parent element
            parentElement.appendChild(tr);
        }
    }
}
function createTableData(playerPlacements, games, totalWinnerPots) {
    console.log(playerPlacements);
    console.log(games);
    console.log(totalWinnerPots);
    var array = new Array();
    var Ranking = 1;
    for (const player of playerPlacements) {
        var row = {};
        var Name = player.name;
        var GamesPlayed = 0;
        var Wins = 0;
        var TotalWinnerPot = 0;
        var WinRatio = 0;
        var TopPlacement = 8
        var WorstPlacement = 0;
        var Score = player.placement;
        var Top3Placements = 0;
        var Top3Chance = 0;
        for (const game of games) {
            var placements = game.placements;
            var found = placements.find(p => p == Name)
            if (found) {
                GamesPlayed++;
            }
            var isFirstPlace = placements[0] == Name;
            if (isFirstPlace) {
                Wins++;
            }
            var placementIndex = 1;
            for (const player of placements) {
                if (Name == player) {
                    if (TopPlacement > placementIndex) TopPlacement = placementIndex;
                    break;
                }
                placementIndex++;
            }
            placementIndex = 1;
            for (const player of placements) {
                if (Name == player) {
                    if (placementIndex > WorstPlacement) {
                        WorstPlacement = placementIndex;
                    }
                }
                placementIndex++;
            }
            placementIndex = 1;
            for (const player of placements) {
                if (Name == player) {
                    if (placementIndex == 1) {
                        Top3Placements++;
                    }
                    if (placementIndex == 2) {
                        Top3Placements++;
                    }
                    if (placementIndex == 3) {
                        Top3Placements++;
                    }
                }
                placementIndex++;
            }

        }
        var winnerPot = totalWinnerPots[Name];
        if (winnerPot) {
            TotalWinnerPot = winnerPot;
        }
        WinRatio = `${(Wins / GamesPlayed) * 100}%`;
        Top3Chance =`${(Top3Placements / GamesPlayed) * 100}%`;

        row = { Ranking, Name ,TotalWinnerPot, GamesPlayed,Wins,  Top3Placements, TopPlacement, WorstPlacement, WinRatio, Top3Chance,Score};
        array.push(row);
        Ranking++;

    }
    return array;

}
(async () => {
    const players = await loadPlayers();
    const games = await loadGameHistory();
    const placementPoints = await loadPlacementsPoints();

    var playerPlacements = getPlayerPlacements(games, placementPoints);
    var totalWinnerPots = getTotalWinnerPot(games);

    // Sort Player placement by largest number
    var sortedPlayerPlacementArray = convertMapToArray(playerPlacements);
    console.log(sortedPlayerPlacementArray);
    sortedPlayerPlacementArray = sortedPlayerPlacementArray.sort((a, b) => { return b.placement - a.placement; });
    var parentElement = document.querySelector(`#placmentfirst`);
    var player1 = players.find(p => p.name == sortedPlayerPlacementArray[0].name)
    createCard(parentElement, "#1", player1, "25rem", "");
    parentElement = document.querySelector("#placmentsecond")
    var player2 = players.find(p => p.name == sortedPlayerPlacementArray[1].name)
    var player3 = players.find(p => p.name == sortedPlayerPlacementArray[2].name)
    createCard(parentElement, "#2", player2, "17rem", "");
    createCard(parentElement, "#3", player3, "10rem", "100%");

    var tableRowData = createTableData(sortedPlayerPlacementArray, games, totalWinnerPots)
    console.log(tableRowData)
    parentElement = document.querySelector("#tablehead")
    createTableHr(parentElement, Object.keys(tableRowData[0]));
    parentElement = document.querySelector("#tablebody");
    createTableRow(parentElement, tableRowData);


    google.charts.load('current', { 'packages': ['corechart'] });
    google.charts.setOnLoadCallback(drawChart);

    function drawChart() {
        var data = google.visualization.arrayToDataTable(convertWinnerPotToArray(totalWinnerPots));
        var options = {
            title: 'Winner Pot distribution'
        };
        var chart = new google.visualization.PieChart(document.getElementById('piechart'));
        chart.draw(data, options);
    }
})();
