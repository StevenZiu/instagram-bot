const faker = require("faker");

const makeEmailId = () => {
  return faker.internet.email();
};
const getRandomInt = max => {
  return Math.floor(Math.random() * Math.floor(max));
};

const makeUserName = () => {
  let randomUserName = faker.name
    .findName()
    .split(" ")
    .join("");
  let randomNum = getRandomInt(999999);
  return randomUserName + randomNum;
};

module.exports = {
  makeEmailId,
  makeUserName
};
