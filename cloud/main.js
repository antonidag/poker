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
function getPlacementsPoints(){
  return {
    1: 23,
    2: 21,
    3: 19,
    4: 17,
    5: 15,
    6: 13,
    7: 11,
    8: 5
  }
}
async function getPlayerPlacements() {
  var playerPlacements = new Map();
  var games = await loadData('GameHistory')
  var placementPoints = getPlacementsPoints();
  var array = []
  for (const game of games) {
    const placements = game.get('placements');
    var placementIndex = 1;
    for (const placement of placements) {
      var currentPlayerPlacement = playerPlacements.get(placement)
      var currentPlacementPoints = placementPoints[placementIndex];
      if (!isNaN(currentPlayerPlacement)) {
        playerPlacements.set(placement, currentPlayerPlacement + currentPlacementPoints);
        placementIndex++;
        continue;
      }
      playerPlacements.set(placement, currentPlacementPoints);
      placementIndex++;
    }
  }
  for (const key of playerPlacements.keys()) {
    array.push({ name: key, placement: playerPlacements.get(key) })
  }
  return array;
}
async function getPlayers() {
  var players = await loadData('User')
  var array = []
  for (const player of players) {
    const img = player.get('img');
    const name = player.get('name')
    const nickName = player.get('nickname')
    const born = player.get('born')
    const memberDate = player.get('createdAt')
    var playerData = {
      img,
      name,
      nickName,
      born,
      memberDate
    }
    array.push(playerData);
  }
  return array;
}

Parse.Cloud.define("getPlayerPlacements", async (request) => {
  return await getPlayerPlacements();
});
Parse.Cloud.define("getPlayers", async (request) => {
  return await getPlayers();
});


