module.exports = {
  async up(queryInterface) {
    await queryInterface.addIndex("jobs", ["client_id"]);
    await queryInterface.addIndex("bids", ["job_id", "talent_id"]);
  },

  async down(queryInterface) {
    await queryInterface.removeIndex("jobs", ["client_id"]);
    await queryInterface.removeIndex("bids", ["job_id", "talent_id"]);
  },
};
