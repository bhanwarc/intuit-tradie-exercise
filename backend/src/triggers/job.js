const moment = require("moment");
const {
  STATUS: { CLOSED },
} = require("../enums/job");

const jobController = require("../controllers/jobs");
const bidController = require("../controllers/bids");

module.exports.anounceWinner = async (job) => {
  /**
   * Gets all sbumitted bids for a project, query calculating project rate
   * If hourly rate set while bidding -> project rate = hourly rate * number of hours required to get job done
   * Records sorted in Ascending order on project rate
   */
  const bids = await bidController.getAllBidderOfJob(job.id);
  if (bids.length) {
    /**
     * If more than one tradie bids are at same rate then get filter all those bids
     * And including other factors for calculating winner like Required Skills, Optional Skills and Bid timestamp
     */

    // Get the lowest bid rate
    const minProjectRate = bids[0].project_rate;
    const sortedBid = bids
      // Get all lowest bids - if more than one bids are at rate
      .filter((bid) => bid.project_rate === minProjectRate)
      // Calculate number of tradie's skills are matching with project's required and optional skills
      .map((bid) => {
        const matchedSkillCount =
          bid?.skills?.filter((skill) => job?.required_skills?.includes(skill))?.length ||
          0;
        const optionalMatchedSkillCount =
          bid?.skills?.filter((skill) => job?.optional_skills?.includes(skill))?.length ||
          0;
        return {
          ...bid,
          matchedSkillCount,
          optionalMatchedSkillCount,
        };
      })
      // Sorting all bids based on matched required skill, matched optional skills and bid submit time
      .sort((bid1, bid2) => {
        // compare required skills
        if (bid1.matchedSkillCount === bid2.matchedSkillCount) {
          // compare optional skills
          if (bid1.optionalMatchedSkillCount === bid2.optionalMatchedSkillCount) {
            // compare dates
            return moment(bid1.created_at) - moment(bid2.created_at);
          }

          if (bid1.optionalMatchedSkillCount > bid2.optionalMatchedSkillCount) {
            return -1;
          }
          return 1;
        }

        if (bid1.matchedSkillCount > bid2.matchedSkillCount) {
          return -1;
        }
        return 1;
      });

    // winner
    const winnerId = sortedBid[0].talent_id;
    if (winnerId) {
      // set winner in project
      await jobController.updateWinner(job.id, [winnerId]);
    }
  }
};

module.exports.closeJobAndAnounceWinner = async () => {
  try {
    // Get all jobs that passes the bid accepting deadline
    const jobs = await jobController.getDeadJobs();
    await Promise.all(
      jobs
        .map((job) => [
          // Annouce winner
          this.anounceWinner(job),
          // Update project status to closed
          jobController.updateJobStatus(job.id, CLOSED),
        ])
        .flat(),
    );
  } catch (err) {
    console.log(err);
  }
};
