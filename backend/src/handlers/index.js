const { response } = require("../helpers/response");

const welcome = async () => {
  const data = { message: "success" };
  return response(data);
};

// register handlers
/* eslint-disable global-require */
const handlers = {
  ...require("./bids"),
  ...require("./talent"),
  ...require("./client"),
  ...require("./jobs"),
};
/* eslint-enable global-require */

module.exports = {
  welcome,
  ...handlers,
};
