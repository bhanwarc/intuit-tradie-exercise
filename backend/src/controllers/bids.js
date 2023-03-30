const { v4: uuid } = require("uuid");
const { Bid, Talent, Job, sequelize } = require("../../models");

module.exports.getBids = async (jobId) =>
  Bid.findAndCountAll({
    include: [
      {
        model: Talent,
      },
    ],
    where: {
      job_id: jobId,
    },
    order: [["created_at", "DESC"]],
    limit: 20,
  });

module.exports.getTalentBids = (talentId) =>
  Bid.findAndCountAll({
    include: [
      {
        model: Job,
      },
    ],
    where: {
      talent_id: talentId,
    },
    order: [["created_at", "DESC"]],
    limit: 20,
  });

module.exports.getBidById = async (id) => Bid.findByPk(id);

module.exports.getBidByUserIdAndJobId = async (jobId, userId) =>
  Bid.findOne({
    where: {
      job_id: jobId,
      talent_id: userId,
    },
  });

module.exports.createBid = async (jobId, talentId, data) =>
  Bid.create({
    id: uuid(),
    job_id: jobId,
    talent_id: talentId,
    proposal: data.proposal,
    fix_rate: parseInt(data.fixRate, 10) || 0,
    hourly_rate: parseInt(data.hourlyRate, 10) || 0,
    job_timeline: parseInt(data.jobTimeline, 10) || 0,
  });

module.exports.getAllBidderOfJob = async (jobId) => {
  const query = `
    SELECT 
      talent_id,
      skills,
      CASE
        WHEN fix_rate != 0 AND fix_rate IS NOT NULL THEN fix_rate
        ELSE hourly_rate * job_timeline
      END AS project_rate,
      b.created_at 
    FROM bids b LEFT JOIN talents t ON b.talent_id = t.id WHERE b.job_id = :job_id
    ORDER BY project_rate ASC, created_at ASC
  `;

  return sequelize.query(query, {
    replacements: { job_id: jobId },
    type: sequelize.QueryTypes.SELECT,
  });
};
