// Initialize Parse
Parse.initialize("gZqn2uqE0Yi3yHrqxS3MVgb0InQviEu9QtVbPx5G", "IvrGvz2KIonAdfUzgOOMK6an3RhlnhaIvqFbCQ9U"); //PASTE HERE YOUR Back4App APPLICATION ID AND YOUR JavaScript KEY
Parse.serverURL = "https://parseapi.back4app.com/";
// Create a new User
async function createParseUser() {
    // Creates a new Parse "User" object, which is created by default in your Parse app
    let user = new Parse.User();
    // Set the input values to the new "User" object
    user.set("username", document.getElementById("emailInput").value);
    user.set("email", document.getElementById("emailInput").value);
    user.set("password", document.getElementById("passwordInput").value);
    user.set("img", document.getElementById("imgInput").value);
    user.set("nickname", document.getElementById("nicknameInput").value);
    user.set("born", document.getElementById("bornInput").value);
    user.set("name",document.getElementById("nameInput").value);
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
        location.href = "./index.html";
      }
    } catch (error) {
      alert(`Error: ${error.message}`);
    }
  }
  
  // Add on click listener to call the create parse user function
  document.getElementById("signUpButton").addEventListener("click", async function () {
    createParseUser();
  });

