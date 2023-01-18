//This is a hello function and will log a message on the console
Parse.Cloud.define("getPlayerPlacements", async (request) => {
  console.log("Hello from Cloud Code!");
  return await loadData('GameHistory');
});

//Note that Cloud functions accept a JSON parameters dictionary on the request object.
Parse.Cloud.define("sumNumbers", async (request) => {
  return (request.params.number1 + request.params.number2);
});


async function loadData(table) {
  let array = []
  const query = new Parse.Query(table)
  const results = await query.find();
  for (let i = 0; i < results.length; i++) {
      const object = results[i];
      const data = await query.get(object.id)
      array.push(data);
  }
  return array;
}