const { Model } = require("sequelize");

module.exports = (sequelize, DataTypes) => {
  class Client extends Model {}
  Client.init(
    {
      id: {
        primaryKey: true,
        type: DataTypes.UUID,
      },
      first_name: DataTypes.STRING,
      last_name: DataTypes.STRING,
      email: DataTypes.STRING,
      company_name: DataTypes.STRING,
      team_size: DataTypes.INTEGER,
      location: DataTypes.STRING,
      timezone: DataTypes.STRING,
      total_job_posted: DataTypes.INTEGER,
      total_hired: DataTypes.INTEGER,
      active_jobs: DataTypes.INTEGER,
      status: DataTypes.STRING,
      created_at: DataTypes.DATE,
      updated_at: DataTypes.DATE,
    },
    {
      sequelize,
      modelName: "Client",
      underscored: true,
      timestamps: true,
      createdAt: "created_at",
      updatedAt: "updated_at",
    },
  );
  return Client;
};
