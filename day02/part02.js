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
    choice: "A",
    victory: "C",
    defeat: "B",
  },
  {
    choice: "B",
    victory: "A",
    defeat: "C",
  },
  {
    choice: "C",
    victory: "B",
    defeat: "A",
  },
];

const drawReward = 3,
  victoryReward = 6;

const outcomeScoreCalc = (requiredEnd) => {
  let outcomeScore = 0;

  if (requiredEnd === "Y") {
    outcomeScore += drawReward;
  } else if (requiredEnd === "Z") {
    outcomeScore += victoryReward;
  }

  return outcomeScore;
};

const movesCalc = (requiredEnd, elfChoice) => {
  const elfChoiceIndex = choices.findIndex((el) => el.choice === elfChoice);
  let userMoves = [];

  try {
    if (requiredEnd === "Y") {
      userMoves.push(elfChoice);
    } else if (requiredEnd === "Z") {
      userMoves.push(choices[elfChoiceIndex].defeat);
    } else {
      userMoves.push(choices[elfChoiceIndex].victory);
    }
  } catch (error) {
    console.error("\x1b[32m", error.name, error.message);
  }

  return userMoves;
};

const calcPoints = (gamesArr) => {
  let totalScore = 0;
  let userMoves = "";
  let userMovesPoints = 0;
  gamesArr.forEach((game) => {
    const { requiredEnd, elfChoice } = game;
    totalScore += outcomeScoreCalc(requiredEnd, elfChoice);
    userMoves += movesCalc(requiredEnd, elfChoice);
  });
  const userMovesAsNb = userMoves
    .replaceAll("A", "1")
    .replaceAll("B", "2")
    .replaceAll("C", "3");

  for (let i0 = 0; i0 < userMovesAsNb.length; i0++) {
    userMovesPoints += parseInt(userMovesAsNb[i0]);
  }

  totalScore += userMovesPoints;
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

    gameArray.splice(1, 1);
    gamesArr.push({ elfChoice: gameArray[0], requiredEnd: gameArray[1] });
  });

  gamesArr.pop();

  calcPoints(gamesArr);
};

strategyResults("./input.txt");
