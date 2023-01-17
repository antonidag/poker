//This is a hello function and will log a message on the console
Parse.Cloud.define("getPlayerPlacements", async (request) => {
  console.log("Hello from Cloud Code!");
  return "Hello from Cloud Code!";
});

//Note that Cloud functions accept a JSON parameters dictionary on the request object.
Parse.Cloud.define("sumNumbers", async (request) => {
  return (request.params.number1 + request.params.number2);
});