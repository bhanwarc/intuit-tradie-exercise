const { Client } = require("../../models");

module.exports.getClient = async (id) => Client.findByPk(id);

module.exports.createClient = async (id, firstName, lastName, email, status) =>
  Client.create({
    id,
    first_name: firstName,
    last_name: lastName,
    email,
    status,
  });

module.exports.updateClient = async (id, data) =>
  Client.update(
    {
      first_name: data.firstName,
      last_name: data.lastName,
      email: data.email,
      company_name: data.companyName,
      team_size: data.teamSize,
      total_job_posted: data.totalJobPosted,
      total_hired: data.totalHired,
      active_jobs: data.activeJobs,
      location: data.location,
      timezone: data.timezone,
    },
    {
      where: {
        id,
      },
    },
  );
