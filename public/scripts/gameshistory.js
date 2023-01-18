function createRow(id, parentElementName) {
    // Create the div element
    var divElement = document.createElement('div');
    divElement.className = 'row';
    divElement.id = `game-row-${id}`;

    // Get the parent element
    var parentElement = document.getElementById(parentElementName);

    // Append the div element to the parent element
    parentElement.appendChild(divElement);
    return document.querySelector(`#game-row-${id}`);
}

function createCard(parentElement, game) {
    // Create the card element
    const card = document.createElement("div");
    card.classList.add("card", "text-white", "bg-dark", "mb-3");
    card.style.width = "25rem";


    // Create the card body element
    const cardBody = document.createElement("div");
    cardBody.classList.add("card-body");
   // cardBody.style.width = "25rem";

    // Create the title element
    const title = document.createElement("h5");
    title.classList.add("card-title");
    title.textContent = game.name;

    // Create the first text element
    const cardTextDate = document.createElement("h6");
    //card-subtitle mb-2 text-muted
    cardTextDate.classList.add("card-subtitle", "mb-2", "text-muted");
    cardTextDate.textContent = game.date;

    // Create the second text element
    const cardLocation = document.createElement("p");
    cardLocation.classList.add("card-text");
    cardLocation.textContent = `Location: ${game.location}`


    // Create the third text element
    const ul = document.createElement("ul");
    //list-group list-group-flush
    ul.classList.add("list-group", "list-group-flush");
    var indexPlacement = 1
    for (const item of game.placements) {
        console.log(item)
        if (indexPlacement == 1) {
            const liLast = document.createElement("li");
            //list-group-item list-group-item-success
            liLast.classList.add("list-group-item", "list-group-item-success");
            liLast.textContent = `${indexPlacement}: ${item}`;
            ul.appendChild(liLast);
        }
        else if (indexPlacement == 2) {
            const liLast = document.createElement("li");
            //list-group-item list-group-item-success
            liLast.classList.add("list-group-item", "list-group-item-primary");
            liLast.textContent = `${indexPlacement}: ${item}`;
            ul.appendChild(liLast);
        }
        else if (indexPlacement == 3) {
            const liLast = document.createElement("li");
            //list-group-item list-group-item-success
            liLast.classList.add("list-group-item", "list-group-item-info");
            liLast.textContent = `${indexPlacement}: ${item}`;
            ul.appendChild(liLast);
        }
        else if (indexPlacement == game.placements.length - 1) {
            const liMiddle = document.createElement("li");
            //list-group-item list-group-item-success
            liMiddle.classList.add("list-group-item", "list-group-item-warning");
            liMiddle.textContent = `${indexPlacement}: ${item}`;
            ul.appendChild(liMiddle);
        }
        else if (indexPlacement == game.placements.length) {
            const liMiddle = document.createElement("li");
            //list-group-item list-group-item-success
            liMiddle.classList.add("list-group-item", "list-group-item-danger");
            liMiddle.textContent = `${indexPlacement}: ${item}`;
            ul.appendChild(liMiddle);
        }
        else {
            const liMiddle = document.createElement("li");
            //list-group-item list-group-item-success
            liMiddle.classList.add("list-group-item", "list-group-item-secondary");
            liMiddle.textContent = `${indexPlacement}: ${item}`;
            ul.appendChild(liMiddle);
        }
        indexPlacement++;
    }

    // Create the second text element
    const cardTextNote = document.createElement("p");
    cardTextNote.classList.add("card-text");
    cardTextNote.textContent = game.note

    // Append all the elements to the card body
    cardBody.appendChild(title);
    cardBody.appendChild(cardTextDate);
    cardBody.appendChild(cardLocation);
    cardBody.appendChild(ul);
    cardBody.appendChild(cardTextNote);
    //cardBody.appendChild(text4);

    // Append the image and card body to the card
    card.appendChild(cardBody);

    // Append the card to the parent element
    parentElement.appendChild(card);
}

(async () => {
    // Initialize Parse
    Parse.initialize("gZqn2uqE0Yi3yHrqxS3MVgb0InQviEu9QtVbPx5G", "IvrGvz2KIonAdfUzgOOMK6an3RhlnhaIvqFbCQ9U"); //PASTE HERE YOUR Back4App APPLICATION ID AND YOUR JavaScript KEY
    Parse.serverURL = "https://parseapi.back4app.com/";
    const data = await Parse.Cloud.run("getGamesHistory");

    let count = 0;
    var parentElement = createRow(count, "card-deck");
    for (const item of data) {
        if (count % 3 == 0) {
            parentElement = createRow(count, "card-deck");

        }
        console.log(item);
        createCard(parentElement, item);
        count++;
    }
})();  