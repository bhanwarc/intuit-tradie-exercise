const { response, errorResponse } = require("../helpers/response");

const jobController = require("../controllers/jobs");
const bidController = require("../controllers/bids");

const { getUser, throwError } = require("../helpers/utils");
const jobTrigger = require("../triggers/job");
const {
  STATUS: { CLOSED },
} = require("../enums/job");

module.exports.getClientJobs = async (event) => {
  const data = { message: "success" };

  const { userId } = getUser(event);
  const { jobId } = event.pathParameters || {};

  try {
    if (jobId) {
      const job = await jobController.getJobById(jobId);
      data.job = job;
    } else {
      const jobs = await jobController.getClientJobs(userId);
      data.jobs = jobs?.rows || [];
      data.count = jobs?.count || 0;
    }
  } catch (err) {
    data.message = "failed";
    return errorResponse(err);
  }
  return response(data);
};

module.exports.getJobs = async (event) => {
  const data = { message: "success" };

  const { userId } = getUser(event);
  const { jobId } = event.pathParameters || {};

  try {
    if (jobId) {
      const [job, bid] = await Promise.all([
        jobController.getJobById(jobId),
        bidController.getBidByUserIdAndJobId(jobId, userId),
      ]);
      data.job = job;
      data.bid = bid;
    } else {
      const jobs = await jobController.getOpenJobs(userId);
      data.jobs = jobs?.rows || [];
      data.count = jobs?.count || 0;
    }
  } catch (err) {
    data.message = "failed";
    return errorResponse(err);
  }
  return response(data);
};

module.exports.createJob = async (event) => {
  const data = { message: "success" };

  const { userId } = getUser(event);
  const { jobId } = event.pathParameters || {};
  const inputData = JSON.parse(event.body) || {};

  try {
    const job = await jobController.createJob(userId, jobId, inputData);
    data.job = job;
  } catch (err) {
    data.message = "failed";
    return errorResponse(err);
  }
  return response(data);
};

module.exports.closeJob = async (event) => {
  const data = { message: "success" };

  const { userId } = getUser(event);
  const { clientId, jobId } = event.pathParameters || {};

  try {
    if (userId !== clientId) throwError("not authorized ", "Forbidden");
    const job = await jobController.getJobById(jobId);

    await Promise.all([
      jobTrigger.anounceWinner(job),
      jobController.updateJobStatusAndDeadline(job.id, CLOSED),
    ]);
  } catch (err) {
    data.message = "failed";
    return errorResponse(err);
  }
  return response(data);
};
