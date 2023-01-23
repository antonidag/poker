async function loadData(table) {
  let array = []
  const query = new Parse.Query(table)
  const results = await query.first({ useMasterKey: true });
  for (let i = 0; i < results.length; i++) {
    const object = results[i];
    const data = await query.get(object.id)
    array.push(data);
  }
  return results;
}


function getPlacementsPoints() {
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
  var games = await getGamesHistory();
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
  return array.sort((a, b) => { return b.placement - a.placement; });;
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

async function getGamesHistory() {
  var games = await loadData('GameHistory')
  var array = []
  for (const game of games) {
    const buyin = game.get('buyin');
    const name = game.get('name')
    const placements = game.get('placements')
    const date = game.get('date')
    const extra = game.get('extra')
    const note = game.get('note')
    const location = game.get('location')
    var gameData = {
      buyin,
      name,
      placements,
      date,
      extra,
      note,
      location
    }
    array.push(gameData);
  }
  return array;
}
async function getTotalWinnerPot() {
  var totalWinnerPots = new Map();
  const games = await getGamesHistory();
  for (const game of games) {
    const placements = game.placements;
    var placementIndex = 1;
    for (const placement of placements) {
      var currentPlayerPot = totalWinnerPots.get(placement)
      if (placementIndex == 1) {
        var gamePot = (5 * game.buyin) + game.extra;
        if (!isNaN(currentPlayerPot)) {
          totalWinnerPots.set(placement, currentPlayerPot + gamePot)
          placementIndex++;
          continue;
        }
        totalWinnerPots.set(placement, gamePot)
        placementIndex++;
        continue;
      }
      if (placementIndex == 2) {
        var gamePot = (2 * game.buyin);
        if (!isNaN(currentPlayerPot)) {

          totalWinnerPots.set(placement, currentPlayerPot + gamePot)
          placementIndex++;
          continue;
        }
        totalWinnerPots.set(placement, gamePot)
        placementIndex++;
        continue;
      }
      if (placementIndex == 3) {
        var gamePot = (game.buyin);
        if (!isNaN(currentPlayerPot)) {

          totalWinnerPots.set(placement, currentPlayerPot + gamePot)
          placementIndex++;
          continue;
        }
        totalWinnerPots.set(placement, gamePot);
        placementIndex++;
        break;
      }

    }
  }
  return totalWinnerPots;
}
async function getPlayerPlacements() {
  var playerPlacements = new Map();
  var games = await getGamesHistory();
  var placementPoints = getPlacementsPoints();
  for (const game of games) {
    const placements = game.placements;
    var placementIndex = 1;
    for (const placement of placements) {
      var currentPlayerPlacement = playerPlacements[placement]
      var currentPlacementPoints = placementPoints[placementIndex];
      if (!isNaN(currentPlayerPlacement)) {
        playerPlacements[placement] = currentPlayerPlacement + currentPlacementPoints;
        placementIndex++;
        continue;
      }
      playerPlacements[placement] = currentPlacementPoints;
      placementIndex++;
    }
  }
  return playerPlacements;
}
async function getPlayerRankings() {
  console.log("Data for Player Rankings")

  var games = await getGamesHistory();
  var totalWinnerPots = await getTotalWinnerPot();
  var playerPlacements = await getPlayerPlacements();
  var array = new Array();
  var Ranking = 1;
  console.log(playerPlacements, games, totalWinnerPots);
  for (const player of Object.keys(playerPlacements)) {
    var row = {};
    var Name = player.name;
    var GamesPlayed = 0;
    var Wins = 0;
    var TotalWinnerPot = 0;
    var WinRatio = 0;
    var TopPlacement = 8
    var WorstPlacement = 0;
    var Score = player.placement;
    var Top3Placements = 0;
    var Top3Chance = 0;
    for (const game of games) {
      var placements = game.placements;
      var found = placements.find(p => p == Name)
      if (found) {
        GamesPlayed++;
      }
      var isFirstPlace = placements[0] == Name;
      if (isFirstPlace) {
        Wins++;
      }
      var placementIndex = 1;
      for (const player of placements) {
        if (Name == player) {
          if (TopPlacement > placementIndex) TopPlacement = placementIndex;
          break;
        }
        placementIndex++;
      }
      placementIndex = 1;
      for (const player of placements) {
        if (Name == player) {
          if (placementIndex > WorstPlacement) {
            WorstPlacement = placementIndex;
          }
        }
        placementIndex++;
      }
      placementIndex = 1;
      for (const player of placements) {
        if (Name == player) {
          if (placementIndex == 1) {
            Top3Placements++;
          }
          if (placementIndex == 2) {
            Top3Placements++;
          }
          if (placementIndex == 3) {
            Top3Placements++;
          }
        }
        placementIndex++;
      }

    }
    var winnerPot = totalWinnerPots[Name];
    if (winnerPot) {
      TotalWinnerPot = winnerPot;
    }
    WinRatio = `${(Wins / GamesPlayed) * 100}%`;
    Top3Chance = `${(Top3Placements / GamesPlayed) * 100}%`;

    row = { Ranking, Name, TotalWinnerPot, GamesPlayed, Wins, Top3Placements, TopPlacement, WorstPlacement, WinRatio, Top3Chance, Score };
    array.push(row);
    Ranking++;

  }
  return array;
}

async function getEvent() {
  var data = await loadData("Event");
  return data;
}

Parse.Cloud.define("getPlayerPlacements", async (request) => {
  return await getPlayerPlacements();
});
Parse.Cloud.define("getPlayers", async (request) => {
  return await getPlayers();
});
Parse.Cloud.define("getGamesHistory", async (request) => {
  return await getGamesHistory();
});
Parse.Cloud.define("getTotalWinnerPot", async (request) => {
  return await getTotalWinnerPot();
});
Parse.Cloud.define("getPlayerRankings", async (request) => {
  return await getPlayerRankings();
});

Parse.Cloud.define("getEvent", async (request) => {
  return await getEvent();
});

Parse.Cloud.define('hello', function (request, response) {
  var query = new Parse.Query("Event");
  query.find({
    useMasterKey: true,
    success: function (data) {
      console.log(data)
      return response.success(data);
    },
    error: function (err) {
      return response.error(err);
    }
  })
});


