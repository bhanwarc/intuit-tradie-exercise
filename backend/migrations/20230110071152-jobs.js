module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable("jobs", {
      id: {
        allowNull: false,
        primaryKey: true,
        type: Sequelize.UUID,
      },
      client_id: {
        allowNull: false,
        type: Sequelize.UUID,
      },
      title: {
        allowNull: false,
        type: Sequelize.TEXT,
      },
      description: {
        allowNull: false,
        type: Sequelize.TEXT,
      },
      required_skills: {
        type: Sequelize.ARRAY(Sequelize.STRING),
        allowNull: false,
      },
      optional_skills: {
        type: Sequelize.ARRAY(Sequelize.STRING),
        allowNull: false,
      },
      job_timeline: {
        type: Sequelize.INTEGER, // hours
      },
      required_expertise_level: {
        type: Sequelize.STRING, // ENTRY/MID/EXPERT
        allowNull: false,
      },
      expected_project_rate: {
        allowNull: false,
        defaultValue: 0,
        type: Sequelize.INTEGER,
      },
      expected_hourly_rate: {
        allowNull: false,
        defaultValue: 0,
        type: Sequelize.INTEGER,
      },
      job_type: {
        type: Sequelize.STRING, // longterm/one-time/contact
        allowNull: false,
      },
      expected_proposal_count: {
        type: Sequelize.INTEGER,
      },
      proposal_count: {
        allowNull: false,
        defaultValue: 0,
        type: Sequelize.INTEGER,
      },
      accepted_proposal_count: {
        allowNull: false,
        type: Sequelize.INTEGER,
        defaultValue: 0,
      },
      invite_count: {
        type: Sequelize.INTEGER,
        allowNull: false,
        defaultValue: 0,
      },
      invite_response_count: {
        type: Sequelize.INTEGER,
        allowNull: false,
        defaultValue: 0,
      },
      proposal_deadline: {
        type: Sequelize.DATE,
        allowNull: false,
      },
      bid_winners: {
        type: Sequelize.ARRAY(Sequelize.STRING),
      },
      preferred_exployee_locations: {
        type: Sequelize.ARRAY(Sequelize.STRING),
      },
      status: {
        type: Sequelize.STRING, // ACTIVE/INACTIVE/DELETED/NOVERIFIED
        defaultValue: "INACTIVE",
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
    await queryInterface.dropTable("jobs");
  },
};
