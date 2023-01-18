function createRow(id, parentElementName) {
    // Create the div element
    var divElement = document.createElement('div');
    divElement.className = 'row';
    divElement.id = `player-row-${id}`;

    // Get the parent element
    var parentElement = document.getElementById(parentElementName);

    // Append the div element to the parent element
    parentElement.appendChild(divElement);
    return document.querySelector(`#player-row-${id}`);
}

function createCard(parentElement, player) {
    // Create the card element
    const card = document.createElement("div");
    card.classList.add("card", "text-white", "bg-dark", "mb-3");
    card.style.maxWidth = "";

    // Create the image element
    const img = document.createElement("img");
    img.src = player.img;
    img.classList.add("card-img-top");
    img.alt = "...";

    // Create the card body element
    const cardBody = document.createElement("div");
    cardBody.classList.add("card-body");

    // Create the title element
    const title = document.createElement("h5");
    title.classList.add("card-title");
    title.textContent = player.name;


    // Create the fourth text element
    const text4 = document.createElement("p");
    text4.classList.add("card-text");
    text4.textContent = `Age: ${player.born}`;

    // Append all the elements to the card body
    cardBody.appendChild(title);
    cardBody.appendChild(text4);

    // Append the image and card body to the card
    card.appendChild(img);
    card.appendChild(cardBody);

    // Append the card to the parent element
    parentElement.appendChild(card);
}

(async () => {
    // Initialize Parse
    Parse.initialize("gZqn2uqE0Yi3yHrqxS3MVgb0InQviEu9QtVbPx5G", "IvrGvz2KIonAdfUzgOOMK6an3RhlnhaIvqFbCQ9U"); //PASTE HERE YOUR Back4App APPLICATION ID AND YOUR JavaScript KEY
    Parse.serverURL = "https://parseapi.back4app.com/";
    const data = await Parse.Cloud.run("getPlayers");

    let count = 0;
    var parentElement = createRow(count, "card-deck");
    for (const item of data) {
        if (count % 4 == 0) {
            parentElement = createRow(count, "card-deck");
        }
        console.log(item);
        createCard(parentElement, item);
        count++;
    }
})();  