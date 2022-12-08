#!/usr/bin/env node

const fs = require("fs");

const getDatas = (file) =>
  new Promise((res) => {
    fs.readFile(file, (err, buffer) => {
      const data = buffer.toString();
      res(data);
    });
  });

const logResults = (totalArr) => {
  let totalTop3 = 0;

  for (let i0 = 0; i0 < 3; i0++) {
    totalTop3 += totalArr[i0];
  }

  console.log(`totalArr :\n${totalArr}\n totalTop3 : ${totalTop3}`);
};

const totalPerElf = async (input) => {
  let totalArr = [];
  let value = 0;
  let datas = [];

  try {
    let res = await getDatas(input);
    datas = res;
  } catch (err) {}

  datas?.split("\n").forEach((el) => {
    if (!el || value === 0) {
      totalArr.push(value);
      value = null;
    } else {
      value = parseInt(el) + value;
    }
  });

  totalArr.sort((_a, _b) => _b - _a).pop();
  logResults(totalArr);
};

totalPerElf("./input.txt");
