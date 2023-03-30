const { Model } = require("sequelize");

module.exports = (sequelize, DataTypes) => {
  class Bid extends Model {
    static associate(models) {
      models.Bid.hasOne(models.Talent, {
        foreignKey: "id",
        sourceKey: "talent_id",
      });
      models.Bid.hasOne(models.Job, {
        foreignKey: "id",
        sourceKey: "job_id",
      });
    }
  }
  Bid.init(
    {
      id: {
        primaryKey: true,
        type: DataTypes.UUID,
      },
      job_id: DataTypes.UUID,
      talent_id: DataTypes.UUID,
      proposal: DataTypes.TEXT,
      fix_rate: DataTypes.INTEGER,
      hourly_rate: DataTypes.INTEGER,
      job_timeline: DataTypes.INTEGER,
      status: DataTypes.STRING,
      created_at: DataTypes.DATE,
      updated_at: DataTypes.DATE,
    },
    {
      sequelize,
      modelName: "Bid",
      underscored: true,
      timestamps: true,
      createdAt: "created_at",
      updatedAt: "updated_at",
    },
  );
  return Bid;
};
