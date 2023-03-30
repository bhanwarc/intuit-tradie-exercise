module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable("clients", {
      id: {
        allowNull: false,
        primaryKey: true,
        type: Sequelize.UUID,
      },
      first_name: {
        allowNull: false,
        type: Sequelize.STRING,
      },
      last_name: {
        allowNull: false,
        type: Sequelize.STRING,
      },
      email: {
        type: Sequelize.STRING,
        allowNull: false,
        unique: true,
      },
      company_name: {
        type: Sequelize.STRING,
      },
      team_size: {
        default: 0,
        type: Sequelize.INTEGER,
      },
      location: {
        type: Sequelize.STRING,
      },
      timezone: {
        allowNull: false,
        defaultValue: "+00:00",
        type: Sequelize.STRING,
      },
      total_job_posted: {
        allowNull: false,
        defaultValue: 0,
        type: Sequelize.INTEGER,
      },
      total_hired: {
        allowNull: false,
        defaultValue: 0,
        type: Sequelize.INTEGER,
      },
      active_jobs: {
        allowNull: false,
        defaultValue: 0,
        type: Sequelize.INTEGER,
      },
      status: {
        allowNull: false,
        type: Sequelize.STRING, // ACTIVE/INACTIVE/DELETED/NOT_CONFIRMED
        defaultValue: "NOT_CONFIRMED",
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
    await queryInterface.dropTable("clients");
  },
};
