$(function () {
    var includes = $('[data-include]')
    $.each(includes, function () {
        var file = 'shared/' + $(this).data('include') + '.html'
        $(this).load(file)
    })
})
async function sendPlayer(name, age, nickname, file) {
    try {

        var myHeaders = new Headers();
        myHeaders.append("Content-Type", "application/json");

        var raw = JSON.stringify({
            "name": name,
            "age": age,
            "nickname": nickname,
            "img": file
        });

        var requestOptions = {
            method: 'POST',
            headers: myHeaders,
            body: raw,
            redirect: 'follow'
        };
        const response = await fetch("http://localhost:3000/player", requestOptions);
    } catch (error) {
        console.error(error);
    }
}
async function logSubmit(event) {
    console.log(`Form Submitted! Time stamp: ${event.timeStamp}`);
    event.preventDefault();
    console.log(event)

    // Get the form values
    var name = form.elements.name.value;
    var age = form.elements.age.value;
    var nickname = form.elements.nickname.value;
    var file = form.elements.file.value;

    // Do something with the form values, such as display them or send them to a server
    console.log(file);

    await sendPlayer(name, age, nickname, file)


    window.location.href = '/createplayer.html'
}

const form = document.getElementById('form');
form.addEventListener('submit', logSubmit);

