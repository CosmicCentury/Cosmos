import ApiError from "../lib/classes/ApiError";

const errorHandler = (err, req, res, next) => {
  if (err instanceof ApiError) {
    res.status(err.statusCode).send(err.message);
  }
};

export default errorHandler;
