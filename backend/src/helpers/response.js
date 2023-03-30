module.exports.response = (body, status = 200) => {
  return {
    statusCode: status,
    body: JSON.stringify(body),
    headers: {
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Credentials": true,
      "Access-Control-Allow-Headers":
        "Origin, X-Requested-With, Content-Type, Accept, Authorization",
    },
  };
};

module.exports.errorResponse = (error) => {
  console.log(error);

  let statusCode = 500;
  const data = {};
  if (error?.name === "SequelizeDatabaseError") {
    data.message = "Something went wrong!";
  } else if (error?.name === "SequelizeUniqueConstraintError") {
    data.message = error.message;
    data.details = error?.errors?.map((e) => e.message);
    statusCode = 400;
  } else if (error?.name === "ValidationError") {
    data.message = "Validation failed";
    data.details = error?.errors || {};
    statusCode = 400;
  } else if (error?.name === "Forbidden") {
    data.message = error.message;
    statusCode = 403;
  } else {
    data.message = "Something went wrong!";
  }

  return this.response({ error: data }, statusCode);
};
