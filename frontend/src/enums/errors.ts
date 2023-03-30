export default {
  VALIDATION: {
    FIRST_NAME: {
      REQUIRED: "First Name is a required field",
    },
    LAST_NAME: {
      REQUIRED: "Last Name is a required field",
    },
    EMAIL: {
      REQUIRED: "Email is a required field",
      VALID_EMAIL: "Email must be a valid email",
    },
    PASSWORD: {
      REQUIRED: "Password is a required field",
      MIN_8: "Password must contain at least 8 characters",
      CONTAIN_NUMBER: "Password must contain a number",
      CONTAIN_LOWERCASE: "Password must contain a lower case letter",
      CONTAIN_UPPERCASE: "Password must contain an upper case letter",
      CONTAIN_SPECIAL_CHAR: "Password must contain a special character",
    },
    TITLE: {
      REQUIRED: "Title is a required field",
    },
    DESCRIPTION: {
      REQUIRED: "Description is a required field",
    },
    COMPANY_NAME: {
      REQUIRED: "Company name field is a required field",
    },
    SKILLS: {
      REQUIRED: "Skills is a required field",
    },
    TEAM_SIZE: {
      REQUIRED: "Team Size is a required field",
    },
    PROPOSAL: {
      REQUIRED: "Proposal is a required field",
    },
    GENERAL: {
      REQUIRED: "This field is a required field",
      GREATER_THAN_ZERO: "Must be greater than 0",
    },
  },
};
