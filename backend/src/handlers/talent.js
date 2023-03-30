const { response, errorResponse } = require("../helpers/response");

const talentController = require("../controllers/talent");
const { getUser } = require("../helpers/utils");

module.exports.getTalentProfile = async (event) => {
  const data = { message: "success" };

  const { userId } = getUser(event);

  try {
    const talent = await talentController.getTalent(userId);
    data.talent = talent;
  } catch (err) {
    data.message = "failed";
    return errorResponse(err);
  }
  return response(data);
};

module.exports.updateTalentProfile = async (event) => {
  const data = { message: "success" };

  const { userId } = getUser(event);
  const inputData = JSON.parse(event.body) || {};

  try {
    const talent = await talentController.updateTalent(userId, inputData);
    data.talent = talent;
  } catch (err) {
    data.message = "failed";
    return errorResponse(err);
  }
  return response(data);
};
