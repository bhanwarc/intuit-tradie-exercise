import * as yup from "yup";
import errors from "enums/errors";

export default {
  validate_first_name: yup.string().required(errors.VALIDATION.FIRST_NAME.REQUIRED),
  validate_last_name: yup.string().required(errors.VALIDATION.LAST_NAME.REQUIRED),
  validate_email: yup
    .string()
    .email(errors.VALIDATION.EMAIL.VALID_EMAIL)
    .required(errors.VALIDATION.EMAIL.REQUIRED),
  validate_password: yup
    .string()
    .min(8, errors.VALIDATION.PASSWORD.MIN_8)
    .matches(/[0-9]/, errors.VALIDATION.PASSWORD.CONTAIN_NUMBER)
    .matches(/[a-z]/, errors.VALIDATION.PASSWORD.CONTAIN_LOWERCASE)
    .matches(/[A-Z]/, errors.VALIDATION.PASSWORD.CONTAIN_UPPERCASE)
    .matches(
      /(?=.*[\^$*.[\]{}()?\-"!@#%&/,><’:;|_~`])/,
      errors.VALIDATION.PASSWORD.CONTAIN_SPECIAL_CHAR,
    )
    .required(errors.VALIDATION.PASSWORD.REQUIRED),
  validate_password_required: yup.string().required(errors.VALIDATION.PASSWORD.REQUIRED),
  validate_title: yup.string().required(errors.VALIDATION.TITLE.REQUIRED),
  validate_description: yup.string().required(errors.VALIDATION.DESCRIPTION.REQUIRED),
  validate_company_name: yup.string().required(errors.VALIDATION.COMPANY_NAME.REQUIRED),
  validate_skills: yup
    .array()
    .test("skills", errors.VALIDATION.SKILLS.REQUIRED, (arr) => {
      if (arr) {
        return arr.length >= 1;
      }
      return false;
    }),
  validate_team_size: yup.number().required(errors.VALIDATION.TEAM_SIZE.REQUIRED),
  validate_proposal: yup.string().required(errors.VALIDATION.PROPOSAL.REQUIRED),
  validate_fix_rate: yup.number().when("hourlyRate", {
    is: (hourlyRate: number) => !hourlyRate || hourlyRate === 0,
    then: yup
      .number()
      .required(errors.VALIDATION.GENERAL.REQUIRED)
      .min(1, errors.VALIDATION.GENERAL.GREATER_THAN_ZERO),
    otherwise: yup.number(),
  }),
  validate_hourly_rate: yup.number().when("fixRate", {
    is: (fixRate: number) => !fixRate || fixRate === 0,
    then: yup
      .number()
      .required(errors.VALIDATION.GENERAL.REQUIRED)
      .min(1, errors.VALIDATION.GENERAL.GREATER_THAN_ZERO),
    otherwise: yup.number(),
  }),
  validate_job_timeline: yup
    .number()
    .required(errors.VALIDATION.GENERAL.REQUIRED)
    .min(1, errors.VALIDATION.GENERAL.GREATER_THAN_ZERO),
  validate_required_expertise_level: yup
    .string()
    .required(errors.VALIDATION.GENERAL.REQUIRED),

  validate_expected_project_rate: yup.number().when("expectedHourlyRate", {
    is: (expectedHourlyRate: number) => !expectedHourlyRate || expectedHourlyRate === 0,
    then: yup
      .number()
      .required(errors.VALIDATION.GENERAL.REQUIRED)
      .min(1, errors.VALIDATION.GENERAL.GREATER_THAN_ZERO),
    otherwise: yup.number(),
  }),
  validate_expected_hourly_rate: yup.number().when("expectedProjectRate", {
    is: (expectedProjectRate: number) =>
      !expectedProjectRate || expectedProjectRate === 0,
    then: yup
      .number()
      .required(errors.VALIDATION.GENERAL.REQUIRED)
      .min(1, errors.VALIDATION.GENERAL.GREATER_THAN_ZERO),
    otherwise: yup.number(),
  }),

  validate_job_type: yup.string().required(errors.VALIDATION.GENERAL.REQUIRED),
  validate_proposal_deadline: yup.string().required(errors.VALIDATION.GENERAL.REQUIRED),
};
