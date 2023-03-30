const { Model } = require("sequelize");

module.exports = (sequelize, DataTypes) => {
  class Talent extends Model {}
  Talent.init(
    {
      id: {
        primaryKey: true,
        type: DataTypes.UUID,
      },
      first_name: DataTypes.STRING,
      last_name: DataTypes.STRING,
      email: DataTypes.STRING,
      title: DataTypes.STRING,
      description: DataTypes.TEXT,
      skills: DataTypes.ARRAY(DataTypes.STRING),
      languages: DataTypes.ARRAY(DataTypes.STRING),
      badge: DataTypes.STRING,
      hours_per_week: DataTypes.INTEGER,
      job_success_count: DataTypes.INTEGER,
      total_earning: DataTypes.INTEGER,
      location: DataTypes.STRING,
      timezone: DataTypes.STRING,
      status: DataTypes.STRING,
      created_at: DataTypes.DATE,
      updated_at: DataTypes.DATE,
    },
    {
      sequelize,
      modelName: "Talent",
      underscored: true,
      timestamps: true,
      createdAt: "created_at",
      updatedAt: "updated_at",
    },
  );
  return Talent;
};
