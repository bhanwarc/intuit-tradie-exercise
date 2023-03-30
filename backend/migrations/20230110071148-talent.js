module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable("talents", {
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
      title: {
        type: Sequelize.STRING,
      },
      description: {
        type: Sequelize.TEXT,
      },
      skills: {
        type: Sequelize.ARRAY(Sequelize.STRING),
      },
      languages: {
        type: Sequelize.ARRAY(Sequelize.STRING),
      },
      badge: {
        type: Sequelize.STRING,
      },
      hours_per_week: {
        allowNull: false,
        defaultValue: 0,
        type: Sequelize.INTEGER,
      },
      job_success_count: {
        allowNull: false,
        defaultValue: 0,
        type: Sequelize.INTEGER,
      },
      total_earning: {
        allowNull: false,
        defaultValue: 0,
        type: Sequelize.INTEGER, // in usd
      },
      location: {
        type: Sequelize.STRING,
      },
      timezone: {
        allowNull: false,
        defaultValue: "+00:00",
        type: Sequelize.STRING,
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
    await queryInterface.dropTable("talents");
  },
};
