#!/usr/bin/env node

const fs = require("fs");

const getData = (file) =>
  new Promise((res) => {
    fs.readFile(file, (err, buffer) => {
      const data = buffer.toString();
      res(data);
    });
  });

const choices = [
  {
    choice: "X",
    victory: "C",
    defeat: "B",
  },
  {
    choice: "Y",
    victory: "A",
    defeat: "C",
  },
  {
    choice: "Z",
    victory: "B",
    defeat: "A",
  },
];

const outcomePoints = (userChoice, elfChoice) => {
  const defeatReward = 0,
    drawReward = 3,
    victoryReward = 6;
  let outcomeReward = 0;

  const choiceIndex = choices.findIndex((el) => el.choice === userChoice);

  if (choices[choiceIndex].victory.includes(elfChoice)) {
    outcomeReward += victoryReward;
  } else if (choices[choiceIndex].defeat.includes(elfChoice)) {
    outcomeReward += defeatReward;
  } else {
    outcomeReward += drawReward;
  }

  return outcomeReward;
};

const pointsCalc = (gamesArr) => {
  let totalScore = 0;

  gamesArr.forEach((game) => {
    if (game.userChoice === "X") {
      totalScore += 1;
    } else if (game.userChoice === "Y") {
      totalScore += 2;
    } else {
      totalScore += 3;
    }

    totalScore += outcomePoints(game.userChoice, game.elfChoice);
  });

  console.log(totalScore);
};

const strategyResults = async (input) => {
  let gamesArr = [];
  let data = [];

  try {
    let res = await getData(input);
    data = res;
  } catch (err) {
    throw Error(err);
  }

  data?.split("\n").forEach((game) => {
    const gameArray = Array.from(game);

    // remove the " " existing as in the array at the index 1
    gameArray.splice(1, 1);
    gamesArr.push({ elfChoice: gameArray[0], userChoice: gameArray[1] });
  });

  gamesArr.pop();
  pointsCalc(gamesArr);
};

strategyResults("./input.txt");
