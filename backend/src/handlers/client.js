const { response, errorResponse } = require("../helpers/response");

const clientController = require("../controllers/client");
const { getUser } = require("../helpers/utils");

module.exports.getClientProfile = async (event) => {
  const data = { message: "success" };

  const { userId } = getUser(event);

  try {
    const client = await clientController.getClient(userId);
    data.client = client;
  } catch (err) {
    data.message = "failed";
    return errorResponse(err);
  }
  return response(data);
};

module.exports.updateClientProfile = async (event) => {
  const data = { message: "success" };

  const { userId } = getUser(event);
  const inputData = JSON.parse(event.body) || {};

  try {
    const client = await clientController.updateClient(userId, inputData);
    data.client = client;
  } catch (err) {
    data.message = "failed";
    return errorResponse(err);
  }
  return response(data);
};
