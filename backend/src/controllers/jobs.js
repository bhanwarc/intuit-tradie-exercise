const { v4: uuid } = require("uuid");
const moment = require("moment");
const { Op } = require("sequelize");
const sequelize = require("sequelize");

const {
  STATUS: { ACTIVE },
} = require("../enums/job");

const { Job } = require("../../models");

module.exports.getClientJobs = async (clientId) =>
  Job.findAndCountAll({
    where: {
      client_id: clientId,
    },
    order: [["created_at", "DESC"]],
    limit: 20,
  });

module.exports.getOpenJobs = async (userId) =>
  Job.findAndCountAll({
    attributes: {
      include: [
        [
          sequelize.literal(
            `(SELECT COUNT(*) FROM bids WHERE job_id = "Job".id AND talent_id = '${userId}' )`,
          ),
          "bid_already_placed",
        ],
      ],
    },
    where: {
      status: ACTIVE,
      proposal_deadline: {
        [Op.gt]: moment().toDate(),
      },
    },
    order: [["proposal_deadline", "ASC"]],
    limit: 20,
  });

module.exports.getDeadJobs = async () =>
  Job.findAll({
    where: {
      status: ACTIVE,
      proposal_deadline: {
        [Op.lt]: moment().toDate(),
      },
    },
    order: [["proposal_deadline", "ASC"]],
  });

module.exports.getJobById = async (id) => Job.findByPk(id);

module.exports.createJob = async (clientId, jobId, data) =>
  Job.upsert(
    {
      id: jobId || uuid(),
      client_id: clientId,
      title: data.title,
      description: data.description,
      required_skills: data.requiredSkills,
      optional_skills: data.optionalSkills,
      job_timeline: data.jobTimeline,
      required_expertise_level: data.requiredExpertiseLevel,
      expected_project_rate: parseInt(data.expectedProjectRate, 10) || 0,
      expected_hourly_rate: parseInt(data.expectedHourlyRate, 10) || 0,
      job_type: data.jobType,
      expected_proposal_count: data.expectedProposalCount,
      proposal_deadline:
        data.proposalDeadline && moment(data.proposalDeadline).format("YYYY-MM-DD HH:mm"),
      preferred_exployee_locations: data.preferredExployeeLocations,
      status: ACTIVE,
    },
    { returning: true },
  );

module.exports.updateJobStatus = (jobId, status) =>
  Job.update(
    {
      status,
    },
    {
      where: {
        id: jobId,
      },
    },
  );

module.exports.updateJobStatusAndDeadline = (jobId, status) =>
  Job.update(
    {
      status,
      proposal_deadline: moment().format("YYYY-MM-DD HH:mm"),
    },
    {
      where: {
        id: jobId,
      },
    },
  );

module.exports.updateWinner = (jobId, winners) =>
  Job.update(
    {
      bid_winners: winners,
    },
    {
      where: {
        id: jobId,
      },
    },
  );
