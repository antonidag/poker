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
    text4.textContent = `Age: ${player.age}`;

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
    const data = await loadPlayers();

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