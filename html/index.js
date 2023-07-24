export class JsonHtml {
    constructor() {

    }
    playerHTML(firstName, lastName) {
        return `<p>${firstName} ${lastName}</p>`
    }
    playersHTML(players) {
        let html = "";
        for (const p of players) {
            html += this.playerHTML(p.FirstName, p.LastName)
        }
        return html;

    }
}