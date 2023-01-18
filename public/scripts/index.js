
// Initialize Parse
Parse.initialize("gZqn2uqE0Yi3yHrqxS3MVgb0InQviEu9QtVbPx5G", "IvrGvz2KIonAdfUzgOOMK6an3RhlnhaIvqFbCQ9U"); //PASTE HERE YOUR Back4App APPLICATION ID AND YOUR JavaScript KEY
Parse.serverURL = "https://parseapi.back4app.com/";

function logIn() {
  // Create a new instance of the user class
  var username = document.getElementById("usernameInput").value;
  var password = document.getElementById("passwordInput").value;
  var user = Parse.User
      .logIn(username, password).then(function(user) {
          console.log('User login successful with name: ' + user.get("username") + ' and email: ' + user.get("email"));
          location.href = './ranking.html';
  }).catch(function(error){
      alert(`Error: ${error.message}`)
  });
}

// Add on click listener to call the create parse user function
document.getElementById("logInButton").addEventListener("click", async function () {
  logIn();
});


