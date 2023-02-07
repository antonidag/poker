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
    eventCard.classList.add("card", "text-center", "bg-info", "text-white", "mb-3");
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
    eventSubtitle.classList.add("card-subtitle", "mb-2");
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

function createAvailableSeatCard(parentElement, seatNr) {
    var eventCol = document.createElement("div");
    eventCol.classList.add("col-sm");
    parentElement.appendChild(eventCol);

    var eventCard = document.createElement("div");
    eventCard.classList.add("card", "text-center", "text-white", "bg-dark", "mb-3");
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

    var eventButton = document.createElement("button");
    eventButton.classList.add("btn", "btn-primary");
    eventButton.innerText = "Claim";
    eventButton.href = "#";
    eventButton.id = seatNr;

    eventCardBody.appendChild(eventButton);
    eventButton.addEventListener("click", async function (event) {
        var result = await claimEventSeat('zHDADRXOwm', seatNr, "antonidag@hotmail.com");
        if (result == "OK") {
            alert("You claim seat:" + seatNr);
        } else {
            console.log(result);
        }
    })
}
function createTakenSeatCard(parentElement, seatNr, player) {
    var eventCol = document.createElement("div");
    eventCol.classList.add("col-sm");
    parentElement.appendChild(eventCol);

    var eventCard = document.createElement("div");
    eventCard.classList.add("card", "text-center", "text-white", "bg-dark", "mb-3");
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
    eventStatus.innerText = "Status: Taken";
    eventCardBody.appendChild(eventStatus);

    var eventButton = document.createElement("p");
    eventButton.classList.add("card-text");
    eventButton.innerText = `Player: ${player}`;
    eventButton.href = "#";
    eventButton.id = seatNr;

    eventCardBody.appendChild(eventButton);
    eventButton.addEventListener("click", async function (event) {
        var result = await claimEventSeat('zHDADRXOwm', seatNr, "antonidag@hotmail.com");
        if (result == "OK") {
            alert("You claim seat:" + seatNr);
            document.location.reload();
        } else {
            console.log(result);
        }
    })
}

async function claimEventSeat(eventId, seatNr, playerName) {
    const data = await Parse.Cloud.run("getEvent");
    const event = new Parse.Object("Event");
    for (const e of data) {
        const isTaken = e.get(`seat${seatNr}`)
        if (e.id == eventId && !isTaken) {
            //set the object
            event.set('objectId', eventId);
            event.set(`seat${seatNr}`, playerName);
            try {
                //Save the Object
                let result = await event.save();
                return "OK"
            } catch (error) {
                return error;
            }
        }
    }
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
    createSeat(data, row, 1);
    createSeat(data, row, 2);
    createSeat(data, row, 3);
    row = createRow();
    content.appendChild(row);
    createSeat(data, row, 4);
    createImgCard(row);
    createSeat(data, row, 5);
    row = createRow();
    content.appendChild(row);
    createSeat(data, row, 6);
    createSeat(data, row, 7);
    createSeat(data, row, 8);

})();  

function createSeat(data, row, index) {
    const element = data[0].get(`seat${index}`);
    const create = element ? createTakenSeatCard(row, index, element) : createAvailableSeatCard(row, index);
}
