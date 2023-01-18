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

// Create a new User
async function createParseUser() {
    // Creates a new Parse "User" object, which is created by default in your Parse app
    let user = new Parse.User();
    // Set the input values to the new "User" object
    user.set("username", document.getElementById("username").value);
    user.set("email", document.getElementById("email").value);
    user.set("password", document.getElementById("password").value);
    try {
      // Call the save method, which returns the saved object if successful
      user = await user.save();
      if (user !== null) {
        // Notify the success by getting the attributes from the "User" object, by using the get method (the id attribute needs to be accessed directly, though)
        alert(
          `New object created with success! ObjectId: ${
            user.id
          }, ${user.get("username")}`
        );
      }
    } catch (error) {
      alert(`Error: ${error.message}`);
    }
  }
  
  // Add on click listener to call the create parse user function
  document.getElementById("createButton").addEventListener("click", async function () {
    createParseUser();
  });

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

