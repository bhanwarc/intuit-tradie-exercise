const { Model } = require("sequelize");

module.exports = (sequelize, DataTypes) => {
  class Job extends Model {}
  Job.init(
    {
      id: {
        primaryKey: true,
        type: DataTypes.UUID,
      },
      client_id: DataTypes.UUID,
      title: DataTypes.TEXT,
      description: DataTypes.TEXT,
      required_skills: DataTypes.ARRAY(DataTypes.STRING),
      optional_skills: DataTypes.ARRAY(DataTypes.STRING),
      job_timeline: DataTypes.STRING,
      required_expertise_level: DataTypes.STRING,
      expected_project_rate: DataTypes.INTEGER,
      expected_hourly_rate: DataTypes.INTEGER,
      job_type: DataTypes.STRING,
      expected_proposal_count: DataTypes.INTEGER,
      proposal_count: DataTypes.INTEGER,
      accepted_proposal_count: DataTypes.INTEGER,
      invite_count: DataTypes.INTEGER,
      invite_response_count: DataTypes.INTEGER,
      proposal_deadline: DataTypes.DATE,
      bid_winners: DataTypes.ARRAY(DataTypes.STRING),
      preferred_exployee_locations: DataTypes.ARRAY(DataTypes.STRING),
      status: DataTypes.STRING,
      created_at: DataTypes.DATE,
      updated_at: DataTypes.DATE,
    },
    {
      sequelize,
      modelName: "Job",
      underscored: true,
      timestamps: true,
      createdAt: "created_at",
      updatedAt: "updated_at",
    },
  );
  return Job;
};
