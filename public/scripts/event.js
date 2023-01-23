function createEventCard(eventName, eventLocation, eventDate) {
    var container = document.querySelector(`#content`)

    var eventRow = document.createElement("div");
    eventRow.classList.add("row");

    var eventCol1 = document.createElement("div");
    eventCol1.classList.add("col-sm");
    eventRow.appendChild(eventCol1);

    var eventCol2 = document.createElement("div");
    eventCol2.classList.add("col-sm");
    eventRow.appendChild(eventCol2);

    var eventCard = document.createElement("div");
    eventCard.classList.add("card", "text-center");
    eventCard.style.width = "18rem";
    eventCol2.appendChild(eventCard);

    var eventCardBody = document.createElement("div");
    eventCardBody.classList.add("card-body");
    eventCard.appendChild(eventCardBody);

    var eventTitle = document.createElement("h5");
    eventTitle.classList.add("card-title");
    eventTitle.innerText = eventName;
    eventCardBody.appendChild(eventTitle);

    var eventSubtitle = document.createElement("h6");
    eventSubtitle.classList.add("card-subtitle", "mb-2", "text-muted");
    eventSubtitle.innerText = `Location: ${eventLocation}`;
    eventCardBody.appendChild(eventSubtitle);

    var eventText = document.createElement("p");
    eventText.classList.add("card-text");
    eventText.innerText = `DateToSave: ${eventDate}`;
    eventCardBody.appendChild(eventText);

    var eventCol3 = document.createElement("div");
    eventCol3.classList.add("col-sm");
    eventRow.appendChild(eventCol3);

    container.appendChild(eventRow);
}

function createRow() {
    var row = document.createElement("div");
    row.classList.add("row");
    return row;
}

function createImgCard(parentElement) {
    var col = document.createElement("div");
    col.classList.add("col-sm");
    var img = document.createElement("img");
    img.classList.add("card-img-top");
    img.src = "./shared/media/pokertable.png";
    col.appendChild(img);
    parentElement.appendChild(col);
}

function createSeatCard(parentElement, seatNr) {
    var eventCol = document.createElement("div");
    eventCol.classList.add("col-sm");
    parentElement.appendChild(eventCol);

    var eventCard = document.createElement("div");
    eventCard.classList.add("card", "text-center");
    eventCard.style.width = "18rem";
    eventCol.appendChild(eventCard);

    var eventCardBody = document.createElement("div");
    eventCardBody.classList.add("card-body");
    eventCard.appendChild(eventCardBody);

    var eventTitle = document.createElement("h5");
    eventTitle.classList.add("card-title");
    eventTitle.innerText = `Seat: ${seatNr}`;
    eventCardBody.appendChild(eventTitle);

    var eventStatus = document.createElement("h6");
    eventStatus.classList.add("card-title");
    eventStatus.innerText = "Status: Available";
    eventCardBody.appendChild(eventStatus);

    var eventLink = document.createElement("a");
    eventLink.classList.add("btn", "btn-primary");
    eventLink.innerText = "Claim";
    eventLink.href = "#";
    eventCardBody.appendChild(eventLink);
}




(async () => {
    // Initialize Parse
    Parse.initialize("gZqn2uqE0Yi3yHrqxS3MVgb0InQviEu9QtVbPx5G", "IvrGvz2KIonAdfUzgOOMK6an3RhlnhaIvqFbCQ9U"); //PASTE HERE YOUR Back4App APPLICATION ID AND YOUR JavaScript KEY
    Parse.serverURL = "https://parseapi.back4app.com/";

    var someCookieVaule = "ssfdds";
    const data = await Parse.Cloud.run("getEvent");
    console.log();

    createEventCard(data[0].get("name"), data[0].get("location"), data[0].get("date"));
    var content = document.querySelector("#content")
    var row = createRow();
    content.appendChild(row);
    for (let index = 1; index < 4; index++) {
        const element = data[0].get(`seat${index}`);
        if (element) {

        } else {
            createSeatCard(row, index);
        }
    }
    row = createRow();
    content.appendChild(row);
    var seat = data[0].get(`seat4`);
    if (seat) {

    } else {
        createSeatCard(row, 4)
    }
    createImgCard(row);
    var seat = data[0].get(`seat5`);
    if (seat) {

    } else {
        createSeatCard(row, 5)
    }
    row = createRow();
    content.appendChild(row);
    for (let index = 6; index < 9; index++) {
        const element = data[0].get(`seat${index}`);
        if (element) {

        } else {
            createSeatCard(row, index);
        }
    }
})();  