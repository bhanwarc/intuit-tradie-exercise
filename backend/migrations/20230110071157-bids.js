module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable("bids", {
      id: {
        allowNull: false,
        primaryKey: true,
        type: Sequelize.UUID,
      },
      job_id: {
        allowNull: false,
        type: Sequelize.UUID,
      },
      talent_id: {
        allowNull: false,
        type: Sequelize.UUID,
      },
      proposal: {
        allowNull: false,
        type: Sequelize.TEXT,
      },
      fix_rate: {
        allowNull: false,
        defaultValue: 0,
        type: Sequelize.INTEGER,
      },
      hourly_rate: {
        allowNull: false,
        defaultValue: 0,
        type: Sequelize.INTEGER,
      },
      job_timeline: {
        type: Sequelize.INTEGER, // in hours
        allowNull: false,
      },
      status: {
        type: Sequelize.STRING, // ACCEPTED/REJECTED
      },
      created_at: {
        allowNull: false,
        type: Sequelize.DATE,
        defaultValue: Sequelize.literal("CURRENT_TIMESTAMP"),
      },
      updated_at: {
        allowNull: false,
        type: Sequelize.DATE,
        defaultValue: Sequelize.literal("CURRENT_TIMESTAMP"),
      },
    });
  },
  async down(queryInterface) {
    await queryInterface.dropTable("bids");
  },
};
