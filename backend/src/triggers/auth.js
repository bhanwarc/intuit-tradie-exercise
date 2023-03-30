const {
  status: { ACTIVE },
} = require("../enums/user");

const talentController = require("../controllers/talent");
const clientController = require("../controllers/client");

module.exports.preSignUpTrigger = async (event, context) => {
  // eslint-disable-next-line no-param-reassign
  event.response.autoConfirmUser = true;
  // eslint-disable-next-line no-param-reassign
  event.response.autoVerifyEmail = true;
  context.done(null, event);
};

module.exports.clientPostConfirmationTrigger = async (event, context) => {
  console.log(JSON.stringify(event));

  const attributes = event.request.userAttributes;
  if (attributes.sub) {
    try {
      await clientController.createClient(
        attributes.sub,
        attributes.given_name,
        attributes.family_name,
        attributes.email,
        ACTIVE,
      );
      context.done(null, event);
    } catch (error) {
      console.log(error);
      context.done(error);
    }
  } else {
    console.log("Error: Nothing was written to DB");
    context.done(null, event);
  }
};

module.exports.talentPostConfirmationTrigger = async (event, context) => {
  console.log(JSON.stringify(event));

  const attributes = event.request.userAttributes;
  if (attributes.sub) {
    try {
      await talentController.createTalent(
        attributes.sub,
        attributes.given_name,
        attributes.family_name,
        attributes.email,
        ACTIVE,
      );
      context.done(null, event);
    } catch (error) {
      console.log(error);
      context.done(error);
    }
  } else {
    console.log("Error: Nothing was written to DB");
    context.done(null, event);
  }
};
