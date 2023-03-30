import * as yup from "yup";
import rules from "./rules";

export default {
  signup_schema: yup.object().shape({
    firstName: rules.validate_first_name,
    lastName: rules.validate_last_name,
    email: rules.validate_email,
    password: rules.validate_password,
  }),
  signin_schema: yup.object().shape({
    email: rules.validate_email,
    password: rules.validate_password,
  }),
  talent_schema: yup.object().shape({
    firstName: rules.validate_first_name,
    lastName: rules.validate_last_name,
    email: rules.validate_email,
    title: rules.validate_title,
    description: rules.validate_description,
    skills: rules.validate_skills,
  }),
  client_schema: yup.object().shape({
    firstName: rules.validate_first_name,
    lastName: rules.validate_last_name,
    email: rules.validate_email,
    companyName: rules.validate_company_name,
    teamSize: rules.validate_team_size,
  }),
  place_bid_schema: yup.object().shape(
    {
      proposal: rules.validate_proposal,
      fixRate: rules.validate_fix_rate,
      hourlyRate: rules.validate_hourly_rate,
      jobTimeline: rules.validate_job_timeline,
    },
    [["fixRate", "hourlyRate"]],
  ),
  create_job_schema: yup.object().shape(
    {
      title: rules.validate_title,
      description: rules.validate_description,
      requiredSkills: rules.validate_skills,
      requiredExpertiseLevel: rules.validate_required_expertise_level,
      expectedProjectRate: rules.validate_expected_project_rate,
      expectedHourlyRate: rules.validate_expected_hourly_rate,
      jobType: rules.validate_job_type,
      proposalDeadline: rules.validate_proposal_deadline,
    },
    [["expectedProjectRate", "expectedHourlyRate"]],
  ),
};
