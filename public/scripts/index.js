if(getCookie('user') == ""){
  location.href = '/ranking.html';
}
// Initialize Parse
Parse.initialize("gZqn2uqE0Yi3yHrqxS3MVgb0InQviEu9QtVbPx5G", "IvrGvz2KIonAdfUzgOOMK6an3RhlnhaIvqFbCQ9U"); //PASTE HERE YOUR Back4App APPLICATION ID AND YOUR JavaScript KEY
Parse.serverURL = "https://parseapi.back4app.com/";

function setCookie(cname, cvalue, exdays) {
  const d = new Date();
  d.setTime(d.getTime() + (exdays*24*60*60*1000));
  let expires = "expires="+ d.toUTCString();
  document.cookie = cname + "=" + cvalue + ";" + expires + ";path=/";
}

function getCookie(cname) {
  let name = cname + "=";
  let decodedCookie = decodeURIComponent(document.cookie);
  let ca = decodedCookie.split(';');
  for(let i = 0; i <ca.length; i++) {
    let c = ca[i];
    while (c.charAt(0) == ' ') {
      c = c.substring(1);
    }
    if (c.indexOf(name) == 0) {
      return c.substring(name.length, c.length);
    }
  }
  return "";
}

function logIn() {
  // Create a new instance of the user class
  var username = document.getElementById("usernameInput").value;
  var password = document.getElementById("passwordInput").value;
  var user = Parse.User
      .logIn(username, password).then(function(user) {
          console.log('User login successful with name: ' + user.get("username") + ' and email: ' + user.get("email"));
          setCookie(user.get("username"),user.get("email"),150)
          location.href = '/ranking.html';
  }).catch(function(error){
      console.log("Error: " + error.code + " " + error.message);
  });
}

// Add on click listener to call the create parse user function
document.getElementById("logInButton").addEventListener("click", async function () {
  logIn();
});


