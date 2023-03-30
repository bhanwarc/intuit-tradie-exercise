const { response, errorResponse } = require("../helpers/response");

const bidController = require("../controllers/bids");
const jobController = require("../controllers/jobs");

const { getUser, throwError } = require("../helpers/utils");

module.exports.getJobBids = async (event) => {
  const data = { message: "success" };

  const { userId } = getUser(event);
  const { clientId, jobId } = event.pathParameters || {};

  try {
    if (userId !== clientId) throwError("not authorized ", "Forbidden");
    const [bids, job] = await Promise.all([
      bidController.getBids(jobId),
      jobController.getJobById(jobId),
    ]);

    data.bids = bids?.rows || [];
    data.count = bids?.count || 0;
    data.job = job;
  } catch (err) {
    data.message = "failed";
    return errorResponse(err);
  }
  return response(data);
};

module.exports.getTalentBids = async (event) => {
  const data = { message: "success" };

  const { userId } = getUser(event);

  try {
    const bids = await bidController.getTalentBids(userId);
    data.bids = bids?.rows || [];
    data.count = bids?.count || 0;
  } catch (err) {
    data.message = "failed";
    return errorResponse(err);
  }
  return response(data);
};

module.exports.placeBid = async (event) => {
  const data = { message: "success" };

  const { userId } = getUser(event);

  const { jobId } = event.pathParameters || {};
  const inputData = JSON.parse(event.body) || {};

  try {
    const bid = await bidController.createBid(jobId, userId, inputData);
    data.bid = bid;
  } catch (err) {
    data.message = "failed";
    return errorResponse(err);
  }
  return response(data);
};
