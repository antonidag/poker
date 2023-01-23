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
(async () => {
    // Initialize Parse
    Parse.initialize("gZqn2uqE0Yi3yHrqxS3MVgb0InQviEu9QtVbPx5G", "IvrGvz2KIonAdfUzgOOMK6an3RhlnhaIvqFbCQ9U"); //PASTE HERE YOUR Back4App APPLICATION ID AND YOUR JavaScript KEY
    Parse.serverURL = "https://parseapi.back4app.com/";

    var playerRankings =  await Parse.Cloud.run("getPlayerRankings");
    var totalWinnerPots =  await Parse.Cloud.run("getTotalWinnerPot");
    console.log(totalWinnerPots);
    // var parentElement = document.querySelector(`#placmentfirst`);
    // var player1 = players.find(p => p.name == playerPlacements[p.name])
    // createCard(parentElement, "#1", player1, "25rem", "");
    // parentElement = document.querySelector("#placmentsecond")
    // var player2 = players.find(p => p.name == playerPlacements[p.name])
    // var player3 = players.find(p => p.name == playerPlacements[p.name])
    // createCard(parentElement, "#2", player2, "17rem", "");
    // createCard(parentElement, "#3", player3, "10rem", "100%");


    console.log(playerRankings)
    parentElement = document.querySelector("#tablehead")
    createTableHr(parentElement, Object.keys(playerRankings[0]));
    parentElement = document.querySelector("#tablebody");
    createTableRow(parentElement, playerRankings);


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
