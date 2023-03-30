const { Talent } = require("../../models");

module.exports.getTalent = async (id) => Talent.findByPk(id);

module.exports.createTalent = async (id, firstName, lastName, email, status) =>
  Talent.create({
    id,
    first_name: firstName,
    last_name: lastName,
    email,
    status,
  });

module.exports.updateTalent = async (id, data) =>
  Talent.update(
    {
      first_name: data.firstName,
      last_name: data.lastName,
      email: data.email,
      title: data.title,
      description: data.description,
      skills: data.skills,
      languages: data.languages,
      badge: data.badge,
      hours_per_week: data.hoursPerWeek,
      job_success_count: data.jobSuccessCount,
      total_earning: data.totalEarning,
      location: data.location,
      timezone: data.timezone,
    },
    {
      where: {
        id,
      },
    },
  );
