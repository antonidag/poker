import fs from "fs"
import { GameHistory, PlacementPoints, Player } from "./types";

export const getPlayerStatistics = (parms: { [key: string] : string;}  ) => {
    const games = getGameHistoryData();
    const playerPlacements = getPlayerPlacements(parms);
    const totalWinnerPots = getTotalWinnerPot(parms);
    var array = [];
    var Ranking = 1;
    for (const player of playerPlacements) {
        var row = {};
        var Name = player.name;
        var GamesPlayed = 0;
        var Wins = 0;
        var TotalWinnerPot = 0;
        var WinRatio = "";
        var TopPlacement = 8
        var WorstPlacement = 0;
        var Score = player.placement;
        var Top3Placements = 0;
        var Top3Chance = "";
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
        var winnerPot = totalWinnerPots.get(Name);
        if (winnerPot) {
            TotalWinnerPot = winnerPot;
        }
        WinRatio = `${(Wins / GamesPlayed) * 100}%`;
        Top3Chance = `${(Top3Placements / GamesPlayed) * 100}%`;

        row = { Ranking, Name, Score, Wins, GamesPlayed, TotalWinnerPot, Top3Placements, TopPlacement, WorstPlacement, WinRatio, Top3Chance };
        array.push(row);
        Ranking++;
    }
    return array;
}

export const getPlayerPlacements = (parms: { [key: string] : string;} ) => {
    var playerPlacements = new Map<any, any>();
    const games = getGameHistoryData();
    const placementPoints = getPlacementPointsData();
    var array = []
    for (const game of games) {
        const placements = game.placements;
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
export const getTotalWinnerPot = (parms: { [key: string] : string;} ) => {
    var totalWinnerPots = new Map();
    const games = getGameHistoryData();
    for (const game of games) {
        const placements = game.placements;
        console.log(game,placements);
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

const getRawData = (fileName: string) => {
    return fs.readFileSync(`data/${fileName}`);
}
const getPlayerData = () => {
    return JSON.parse(getRawData('player.json').toString()) as Player[];
}
const getGameHistoryData = () => {

    return JSON.parse(getRawData('gamehistory.json').toString()) as GameHistory[];
}
const getPlacementPointsData = () => {

    return JSON.parse(getRawData('placmentpoints.json').toString()) as PlacementPoints;
}