const jwtDecode = require("jwt-decode");

module.exports.getUser = (event) => {
  let claims;
  if (event.requestContext.authorizer.claims) {
    claims = event.requestContext.authorizer.claims;
  } else {
    claims = jwtDecode(event.headers.Authorization);
  }

  return {
    userId: claims.sub,
    username: claims["cognito:username"],
    email: claims.email,
    givenName: claims.given_name,
    familyName: claims.family_name,
    emailVerified: claims.email_verified,
  };
};

module.exports.throwError = (message, name, details) => {
  const error = new Error(message);

  if (name) error.name = name;
  if (details) error.errors = typeof details === "string" ? [details] : details;

  throw error;
};

exports.throwValidationError = (details) => {
  const errorCount = details.length;
  this.throwError(
    `${errorCount} ${errorCount > 1 ? "errors" : "error"} occurred`,
    "ValidationError",
    details,
  );
};
